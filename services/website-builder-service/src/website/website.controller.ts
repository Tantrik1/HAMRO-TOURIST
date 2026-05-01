import { Controller, Get, Patch, Post, Param, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { UpdateWebsiteConfigDto } from './dto/update-website.dto';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Website Builder')
@Controller('websites')
export class WebsiteController {
  constructor(private readonly svc: WebsiteService) {}

  @Get('config')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get website config for tenant' })
  async getConfig(@Headers('x-tenant-slug') slug: string) {
    return ok(await this.svc.getConfig(slug));
  }

  @Patch('config')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Update website config' })
  async updateConfig(
    @Headers('x-tenant-slug') slug: string,
    @Body() dto: UpdateWebsiteConfigDto,
  ) {
    return ok(await this.svc.updateConfig(slug, dto));
  }

  @Patch(':slug/theme')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Switch theme' })
  async updateTheme(@Param('slug') slug: string, @Body('themeId') themeId: string) {
    return ok(await this.svc.updateTheme(slug, themeId));
  }

  @Post(':slug/publish')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish website (validate + clear ISR + set published)' })
  async publish(@Param('slug') slug: string) {
    return ok(await this.svc.publish(slug));
  }
}
