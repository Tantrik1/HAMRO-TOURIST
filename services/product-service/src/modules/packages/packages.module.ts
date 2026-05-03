import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { PackageEntity } from '../../entities/package.entity';
import { RegionEntity } from '../../entities/region.entity';
import { PackageDestinationEntity } from '../../entities/package-destination.entity';
import { FaqEntity } from '../../entities/faq.entity';
import { GroupDiscountEntity } from '../../entities/group-discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity, RegionEntity, PackageDestinationEntity, FaqEntity, GroupDiscountEntity])],
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
