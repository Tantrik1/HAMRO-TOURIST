import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TourEntity } from '../../entities/tour.entity';
import { TourActivityEntity } from '../../entities/tour-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity, TourActivityEntity])],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
