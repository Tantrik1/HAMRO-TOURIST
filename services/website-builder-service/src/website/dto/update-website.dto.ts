import { IsString, IsOptional, IsArray, IsBoolean, IsEnum, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ThemeId } from '@hamrotourist/shared-types';

export class SectionConfigDto {
  @IsString() id: string;
  @IsString() type: string;
  @IsString() title: string;
  @IsBoolean() enabled: boolean;
  config: Record<string, unknown>;
  sortOrder: number;
}

export class NavLinkDto {
  @IsString() label: string;
  @IsString() href: string;
  @IsBoolean() isExternal: boolean;
}

export class SocialLinkDto {
  @IsString() platform: string;
  @IsString() url: string;
}

export class UpdateWebsiteConfigDto {
  @ApiPropertyOptional({ enum: ThemeId }) @IsOptional() @IsEnum(ThemeId)
  themeId?: ThemeId;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  seoTitle?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  seoDescription?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  faviconUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(20)
  primaryColor?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(20)
  secondaryColor?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(20)
  accentColor?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  headingFont?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  bodyFont?: string;

  @ApiPropertyOptional({ type: [SectionConfigDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SectionConfigDto)
  sections?: SectionConfigDto[];

  @ApiPropertyOptional({ type: [NavLinkDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => NavLinkDto)
  navLinks?: NavLinkDto[];

  @ApiPropertyOptional({ type: [NavLinkDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => NavLinkDto)
  footerLinks?: NavLinkDto[];

  @ApiPropertyOptional({ type: [SocialLinkDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];
}
