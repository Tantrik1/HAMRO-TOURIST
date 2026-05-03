import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TourEntity } from '../../entities/tour.entity';
import { TourActivityEntity } from '../../entities/tour-activity.entity';
import { FaqEntity } from '../../entities/faq.entity';
import { GroupDiscountEntity } from '../../entities/group-discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity, TourActivityEntity, FaqEntity, GroupDiscountEntity])],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
