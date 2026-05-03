import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreksController } from './treks.controller';
import { TreksService } from './treks.service';
import { TrekEntity } from '../../entities/trek.entity';
import { TrekActivityEntity } from '../../entities/trek-activity.entity';
import { FaqEntity } from '../../entities/faq.entity';
import { GroupDiscountEntity } from '../../entities/group-discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrekEntity, TrekActivityEntity, FaqEntity, GroupDiscountEntity])],
  controllers: [TreksController],
  providers: [TreksService],
  exports: [TreksService],
})
export class TreksModule {}
