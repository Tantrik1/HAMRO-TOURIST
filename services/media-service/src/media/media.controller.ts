import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { PresignedUrlDto, RegisterUploadDto } from './dto/presigned-url.dto';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly svc: MediaService) {}

  @Post('presigned-url')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate presigned upload URL for R2' })
  async getPresignedUrl(@Body() dto: PresignedUrlDto) {
    const result = await this.svc.generatePresignedUploadUrl(
      dto.tenantSlug, dto.category, dto.filename, dto.contentType,
    );
    return ok(result);
  }

  @Post('register')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register an uploaded file and queue image processing' })
  async registerUpload(@Body() dto: RegisterUploadDto) {
    const result = await this.svc.registerUpload(dto.tenantSlug, dto.key, dto.contentType);
    return ok(result);
  }

  @Delete('*key')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete media file and its variants' })
  async deleteMedia(@Param('key') key: string) {
    await this.svc.deleteMedia(key);
    return ok({ deleted: true });
  }
}
