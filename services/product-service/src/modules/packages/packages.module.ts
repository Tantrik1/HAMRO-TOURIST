import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { PackageEntity } from '../../entities/package.entity';
import { RegionEntity } from '../../entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity, RegionEntity])],
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
