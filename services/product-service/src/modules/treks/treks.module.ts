import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreksController } from './treks.controller';
import { TreksService } from './treks.service';
import { TrekEntity } from '../../entities/trek.entity';
import { TrekActivityEntity } from '../../entities/trek-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrekEntity, TrekActivityEntity])],
  controllers: [TreksController],
  providers: [TreksService],
  exports: [TreksService],
})
export class TreksModule {}
