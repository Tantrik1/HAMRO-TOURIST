import { IsString, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateSnapshotDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  snapshotType?: 'publish' | 'auto' | 'manual';

  @IsArray()
  @IsOptional()
  pages?: Array<any>;

  @IsObject()
  @IsOptional()
  themeOverrides?: Record<string, any>;

  @IsString()
  themeKey: string;

  @IsString()
  @IsOptional()
  publishedByUserId?: string;

  @IsString()
  @IsOptional()
  publishedByName?: string;
}
