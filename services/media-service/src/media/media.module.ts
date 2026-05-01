import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from '@hamrotourist/shared-types';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { ImageProcessingProcessor } from './image-processing.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: QUEUES.IMAGE_PROCESSING }),
  ],
  controllers: [MediaController],
  providers: [MediaService, ImageProcessingProcessor],
  exports: [MediaService],
})
export class MediaModule {}
