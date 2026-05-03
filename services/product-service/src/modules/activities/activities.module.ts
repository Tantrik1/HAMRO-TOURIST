import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { ActivityEntity } from '../../entities/activity.entity';
import { FaqEntity } from '../../entities/faq.entity';
import { GroupDiscountEntity } from '../../entities/group-discount.entity';
import { ActivityTrekEntity } from '../../entities/activity-trek.entity';
import { ActivityTourEntity } from '../../entities/activity-tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity, FaqEntity, GroupDiscountEntity, ActivityTrekEntity, ActivityTourEntity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
