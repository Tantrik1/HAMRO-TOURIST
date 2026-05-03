import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { RegionEntity } from '../../entities/region.entity';
import { TourEntity } from '../../entities/tour.entity';
import { FaqEntity } from '../../entities/faq.entity';

@Module({
  // RegionsService injects both RegionEntity and TourEntity repositories
  // (for paginated tours-by-region queries).
  imports: [TypeOrmModule.forFeature([RegionEntity, TourEntity, FaqEntity]), HttpModule],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
