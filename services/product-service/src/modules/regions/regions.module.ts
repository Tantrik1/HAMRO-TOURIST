import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { RegionEntity } from '../../entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity]), HttpModule],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
