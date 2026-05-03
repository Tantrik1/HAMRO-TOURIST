import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { UpdateWebsiteConfigDto } from './dto/update-website.dto';
import { ok } from '@hamrotourist/shared-types';

/** Guard against malformed tenant slugs that would crash downstream schema queries. */
function requireTenantSlug(slug: string | undefined): string {
  if (!slug || !/^[a-z0-9][a-z0-9-]{1,62}$/.test(slug)) {
    throw new BadRequestException('Missing or invalid x-tenant-slug header');
  }
  return slug;
}

@ApiTags('Website Builder')
@Controller('websites')
export class WebsiteController {
  constructor(private readonly svc: WebsiteService) {}

  @Get('config')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get website config for tenant' })
  async getConfig(@Headers('x-tenant-slug') slug: string) {
    return ok(await this.svc.getConfig(requireTenantSlug(slug)));
  }

  @Patch('config')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Update website config' })
  async updateConfig(
    @Headers('x-tenant-slug') slug: string,
    @Body() dto: UpdateWebsiteConfigDto,
  ) {
    return ok(await this.svc.updateConfig(requireTenantSlug(slug), dto));
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
