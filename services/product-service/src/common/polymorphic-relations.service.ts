import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqEntity } from '../entities/faq.entity';
import { GroupDiscountEntity } from '../entities/group-discount.entity';
import { FaqDto } from '../dto/faq.dto';
import { GroupDiscountDto } from '../dto/group-discount.dto';

/**
 * Handles persistence of polymorphic FAQ + GroupDiscount rows keyed by
 * (entityType, entityId). Each entity type (country, region, activity, trek,
 * tour, package) uses this helper to save/load these rows against its own
 * primary key.
 *
 * Semantics:
 *  - saveFaqs / saveGroupDiscounts replace the full set for the given entity.
 *    Pass `undefined` to skip (no change); pass `[]` to clear.
 *  - loadFaqs / loadGroupDiscounts return rows sorted by sortOrder asc.
 */
@Injectable()
export class PolymorphicRelationsService {
  constructor(
    @InjectRepository(FaqEntity) private readonly faqRepo: Repository<FaqEntity>,
    @InjectRepository(GroupDiscountEntity) private readonly discountRepo: Repository<GroupDiscountEntity>,
  ) {}

  async saveFaqs(entityType: string, entityId: string, faqs?: FaqDto[]): Promise<void> {
    if (faqs === undefined) return;
    await this.faqRepo.delete({ entityType, entityId });
    if (!faqs.length) return;
    const rows = faqs
      .filter((f) => f.question?.trim() && f.answer?.trim())
      .map((f, idx) =>
        this.faqRepo.create({
          entityType,
          entityId,
          question: f.question.trim(),
          answer: f.answer.trim(),
          sortOrder: f.sortOrder ?? idx,
          isActive: f.isActive ?? true,
        }),
      );
    if (rows.length) await this.faqRepo.save(rows);
  }

  async saveGroupDiscounts(
    entityType: string,
    entityId: string,
    discounts?: GroupDiscountDto[],
  ): Promise<void> {
    if (discounts === undefined) return;
    await this.discountRepo.delete({ entityType, entityId });
    if (!discounts.length) return;
    const rows = discounts.map((d) =>
      this.discountRepo.create({
        entityType,
        entityId,
        minPax: d.minPax,
        maxPax: d.maxPax ?? null,
        discountType: d.discountType,
        discountValue: d.discountValue,
        label: d.label ?? null,
        isActive: d.isActive ?? true,
      }),
    );
    await this.discountRepo.save(rows);
  }

  async loadFaqs(entityType: string, entityId: string): Promise<FaqEntity[]> {
    return this.faqRepo.find({
      where: { entityType, entityId },
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async loadGroupDiscounts(entityType: string, entityId: string): Promise<GroupDiscountEntity[]> {
    return this.discountRepo.find({
      where: { entityType, entityId },
      order: { minPax: 'ASC' },
    });
  }

  async deleteAllForEntity(entityType: string, entityId: string): Promise<void> {
    await Promise.all([
      this.faqRepo.delete({ entityType, entityId }),
      this.discountRepo.delete({ entityType, entityId }),
    ]);
  }
}
