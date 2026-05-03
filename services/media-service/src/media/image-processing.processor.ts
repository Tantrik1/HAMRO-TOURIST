import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import sharp from 'sharp';
import { QUEUES } from '@hamrotourist/shared-types';
import { MediaService } from './media.service';

interface ImageProcessingJob {
  tenantSlug: string;
  key: string;
  contentType: string;
}

const VARIANTS = [
  { name: 'thumb', width: 300 },
  { name: 'card', width: 800 },
  { name: 'hero', width: 1920 },
] as const;

@Processor(QUEUES.IMAGE_PROCESSING)
export class ImageProcessingProcessor extends WorkerHost {
  private readonly logger = new Logger(ImageProcessingProcessor.name);

  constructor(private readonly mediaService: MediaService) {
    super();
  }

  async process(job: Job<ImageProcessingJob>): Promise<void> {
    const { key } = job.data;
    this.logger.log(`Processing image: ${key}`);

    try {
      const originalBuffer = await this.mediaService.downloadBuffer(key);
      const basePath = key.substring(0, key.lastIndexOf('/'));

      for (const variant of VARIANTS) {
        const variantBuffer = await sharp(originalBuffer)
          .resize(variant.width, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();

        const variantKey = `${basePath}/${variant.name}.webp`;
        await this.mediaService.uploadBuffer(variantKey, variantBuffer, 'image/webp');
        this.logger.log(`Created variant: ${variantKey} (${variant.width}px)`);
      }

      this.logger.log(`Image processing complete: ${key}`);
    } catch (err: any) {
      this.logger.error(`Image processing failed: ${key} — ${err.message}`);
      throw err;
    }
  }
}
