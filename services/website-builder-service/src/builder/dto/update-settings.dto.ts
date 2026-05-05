import { IsString, IsOptional, IsBoolean, IsObject, IsArray } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  activeThemeKey?: string;

  @IsObject()
  @IsOptional()
  colors?: Record<string, string>;

  @IsObject()
  @IsOptional()
  fonts?: Record<string, string>;

  @IsString()
  @IsOptional()
  faviconUrl?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  ogImageUrl?: string;

  @IsString()
  @IsOptional()
  googleAnalyticsId?: string;

  @IsArray()
  @IsOptional()
  customCss?: string[];

  @IsArray()
  @IsOptional()
  customHeadScripts?: string[];

  @IsObject()
  @IsOptional()
  seoDefaults?: Record<string, string>;

  @IsString()
  @IsOptional()
  navbarVariant?: string;

  @IsString()
  @IsOptional()
  footerVariant?: string;

  @IsArray()
  @IsOptional()
  navLinks?: Array<any>;

  @IsArray()
  @IsOptional()
  footerColumns?: Array<any>;

  @IsObject()
  @IsOptional()
  socialLinks?: Record<string, string>;
}
