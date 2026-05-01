import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';
import { ItineraryEntity } from '../../entities/itinerary.entity';
import { ItineraryDayEntity } from '../../entities/itinerary-day.entity';
import { ItineraryPricingEntity } from '../../entities/itinerary-pricing.entity';
import { GroupDiscountEntity } from '../../entities/group-discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ItineraryEntity, ItineraryDayEntity, ItineraryPricingEntity, GroupDiscountEntity,
  ])],
  controllers: [ItinerariesController],
  providers: [ItinerariesService],
  exports: [ItinerariesService],
})
export class ItinerariesModule {}
