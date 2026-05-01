import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountryEntity } from '../../entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity]), HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
