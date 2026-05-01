import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';
import { QUEUES } from '@hamrotourist/shared-types';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly cdnBase = 'https://media.hamrotourist.com';

  constructor(
    private readonly config: ConfigService,
    @InjectQueue(QUEUES.IMAGE_PROCESSING) private readonly imageQueue: Queue,
  ) {
    const accountId = this.config.get('CLOUDFLARE_ACCOUNT_ID', '');
    this.bucket = this.config.get('CLOUDFLARE_R2_BUCKET', 'hamrotourist-media');

    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.config.get('CLOUDFLARE_R2_ACCESS_KEY', ''),
        secretAccessKey: this.config.get('CLOUDFLARE_R2_SECRET_KEY', ''),
      },
    });
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
    const chunks: Buffer[] = [];
    for await (const chunk of resp.Body as any) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }
}
