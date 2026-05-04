import { Injectable, Logger, OnModuleInit, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, PutBucketCorsCommand,
} from '@aws-sdk/client-s3';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB limit
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';
import { QUEUES } from '@hamrotourist/shared-types';

@Injectable()
export class MediaService implements OnModuleInit {
  private readonly logger = new Logger(MediaService.name);
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly cdnBase = 'https://media.hamrotourist.com';

  // Store config values for validation
  private readonly accountId: string;
  private readonly r2AccessKey: string;
  private readonly r2SecretKey: string;

  constructor(
    private readonly config: ConfigService,
    @InjectQueue(QUEUES.IMAGE_PROCESSING) private readonly imageQueue: Queue,
  ) {
    // ✅ Get values without defaults - will be empty string if not set
    this.accountId = this.config.get('CLOUDFLARE_ACCOUNT_ID') || '';
    this.bucket = this.config.get('CLOUDFLARE_R2_BUCKET') || 'hamrotourist-media';
    this.r2AccessKey = this.config.get('CLOUDFLARE_R2_ACCESS_KEY') || '';
    this.r2SecretKey = this.config.get('CLOUDFLARE_R2_SECRET_KEY') || '';

    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.r2AccessKey,
        secretAccessKey: this.r2SecretKey,
      },
    });
  }

  async onModuleInit() {
    // ✅ VALIDATE: All required environment variables must be set
    const required = [
      ['CLOUDFLARE_ACCOUNT_ID', this.accountId],
      ['CLOUDFLARE_R2_ACCESS_KEY', this.r2AccessKey],
      ['CLOUDFLARE_R2_SECRET_KEY', this.r2SecretKey],
    ];

    for (const [key, value] of required) {
      if (!value) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
      }
    }

    this.logger.log('✅ All required environment variables configured');

    // Configure CORS on the R2 bucket so browsers can PUT directly to presigned URLs
    try {
      await this.s3.send(new PutBucketCorsCommand({
        Bucket: this.bucket,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedOrigins: [
                'https://hamrotourist.com',
                'https://www.hamrotourist.com',
                'https://app.hamrotourist.com',
                'https://media.hamrotourist.com',
                'http://localhost:3000',
                'http://localhost:3001',
                'http://localhost:3002',
              ],
              AllowedMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
              AllowedHeaders: ['*'],
              ExposeHeaders: ['Content-Length', 'Content-Type', 'ETag'],
              MaxAgeSeconds: 86400,
            },
          ],
        },
      }));
      this.logger.log('✅ R2 bucket CORS configured');
    } catch (err: any) {
      this.logger.warn(`⚠️ Could not configure R2 CORS: ${err.message}`);
    }
  }

  async generatePresignedUploadUrl(
    tenantSlug: string, category: string, filename: string, contentType: string,
  ): Promise<{ uploadUrl: string; key: string; cdnUrl: string }> {
    const fileId = uuidv4();
    const ext = filename.split('.').pop() || 'bin';
    const key = `tenants/${tenantSlug}/${category}/${fileId}/original.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
    const cdnUrl = `${this.cdnBase}/${key}`;

    this.logger.log(`Presigned URL generated: ${key}`);
    return { uploadUrl, key, cdnUrl };
  }

  async registerUpload(tenantSlug: string, key: string, contentType: string): Promise<{ cdnUrl: string }> {
    const cdnUrl = `${this.cdnBase}/${key}`;

    // Queue image processing job if it's an image
    if (contentType.startsWith('image/')) {
      await this.imageQueue.add('process-image', {
        tenantSlug, key, contentType,
      });
      this.logger.log(`Image processing job queued: ${key}`);
    }

    return { cdnUrl };
  }

  getCdnUrl(key: string): string {
    return `${this.cdnBase}/${key}`;
  }

  async deleteMedia(key: string): Promise<void> {
    // Delete original and all variants
    const basePath = key.substring(0, key.lastIndexOf('/'));
    const variants = ['original', 'thumb', 'card', 'hero'];
    const ext = 'webp';

    for (const variant of variants) {
      try {
        const variantKey = variant === 'original' ? key : `${basePath}/${variant}.${ext}`;
        await this.s3.send(new DeleteObjectCommand({
          Bucket: this.bucket, Key: variantKey,
        }));
      } catch {
        // Variant may not exist
      }
    }
    this.logger.log(`Deleted media: ${key}`);
  }

  /** Used by image processor to upload variant back to R2 */
  async uploadBuffer(key: string, buffer: Buffer, contentType: string): Promise<void> {
    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucket, Key: key, Body: buffer, ContentType: contentType,
    }));
  }

  /** Used by image processor to download original */
  async downloadBuffer(key: string): Promise<Buffer> {
    const resp = await this.s3.send(new GetObjectCommand({
      Bucket: this.bucket, Key: key,
    }));

    // ✅ FIXED: Check content length before streaming
    const contentLength = resp.ContentLength || 0;
    if (contentLength > MAX_FILE_SIZE) {
      throw new BadRequestException(`File exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
    }

    const chunks: Buffer[] = [];
    let totalSize = 0;

    for await (const chunk of resp.Body as any) {
      totalSize += chunk.length;
      // ✅ FIXED: Check size during streaming
      if (totalSize > MAX_FILE_SIZE) {
        throw new BadRequestException(`File exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit during streaming`);
      }
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }
}
