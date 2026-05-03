import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RefreshDto {
  @ApiPropertyOptional({
    description:
      'Refresh token. Optional in body; preferred source is the HttpOnly refresh_token cookie.',
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
