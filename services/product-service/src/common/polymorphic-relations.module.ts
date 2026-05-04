import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqEntity } from '../entities/faq.entity';
import { GroupDiscountEntity } from '../entities/group-discount.entity';
import { PolymorphicRelationsService } from './polymorphic-relations.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FaqEntity, GroupDiscountEntity])],
  providers: [PolymorphicRelationsService],
  exports: [PolymorphicRelationsService],
})
export class PolymorphicRelationsModule {}
