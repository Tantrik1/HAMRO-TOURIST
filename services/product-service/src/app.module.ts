import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '@hamrotourist/shared-types';
import { CountriesModule } from './modules/countries/countries.module';
import { RegionsModule } from './modules/regions/regions.module';
import { ToursModule } from './modules/tours/tours.module';
import { TreksModule } from './modules/treks/treks.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ItinerariesModule } from './modules/itineraries/itineraries.module';
import {
  CountryEntity, RegionEntity, TourEntity, TrekEntity,
  ActivityEntity, PackageEntity, TourActivityEntity, TrekActivityEntity,
  ItineraryEntity, ItineraryDayEntity, ItineraryPricingEntity, GroupDiscountEntity,
  FaqEntity, PackageDestinationEntity,
} from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5432),
        username: config.get('DATABASE_USER', 'hamrotourist'),
        password: config.get('DATABASE_PASSWORD', 'hamrotourist_dev'),
        database: config.get('DATABASE_NAME', 'hamrotourist'),
        entities: [
          CountryEntity, RegionEntity, TourEntity, TrekEntity,
          ActivityEntity, PackageEntity, TourActivityEntity, TrekActivityEntity,
          ItineraryEntity, ItineraryDayEntity, ItineraryPricingEntity, GroupDiscountEntity,
          FaqEntity, PackageDestinationEntity,
        ],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    CountriesModule,
    RegionsModule,
    ToursModule,
    TreksModule,
    ActivitiesModule,
    PackagesModule,
    ItinerariesModule,
  ],
})
export class AppModule {}
