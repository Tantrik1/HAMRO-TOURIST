import { IsString, IsOptional, IsBoolean, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSectionDto {
  @IsString()
  sectionType: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsOptional()
  config?: Record<string, any>;

  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @IsString()
  @IsOptional()
  variant?: string;
}

export class CreatePageDto {
  @IsString()
  slug: string;

  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  navLabel?: string;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsBoolean()
  @IsOptional()
  isHome?: boolean;

  @IsBoolean()
  @IsOptional()
  showInNav?: boolean;

  @IsBoolean()
  @IsOptional()
  showInFooter?: boolean;

  @IsString()
  @IsOptional()
  navbarVariant?: string;

  @IsString()
  @IsOptional()
  footerVariant?: string;

  @IsOptional()
  themeOverrides?: Record<string, any>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  @IsOptional()
  sections?: CreateSectionDto[];
}
