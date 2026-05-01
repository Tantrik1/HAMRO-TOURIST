import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { WebsiteConfigEntity } from '../entities/website-config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WebsiteConfigEntity]),
    HttpModule,
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
  exports: [WebsiteService],
})
export class WebsiteModule {}
