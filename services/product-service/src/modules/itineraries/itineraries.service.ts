import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItineraryEntity } from '../../entities/itinerary.entity';
import { ItineraryDayEntity } from '../../entities/itinerary-day.entity';
import { ItineraryPricingEntity } from '../../entities/itinerary-pricing.entity';
import { GroupDiscountEntity } from '../../entities/group-discount.entity';
import { CreateItineraryDto, UpdateItineraryDto } from '../../dto/itinerary.dto';
import { CalculatePriceDto } from '../../dto/pricing-calculator.dto';

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectRepository(ItineraryEntity) private readonly repo: Repository<ItineraryEntity>,
    @InjectRepository(ItineraryDayEntity) private readonly dayRepo: Repository<ItineraryDayEntity>,
    @InjectRepository(ItineraryPricingEntity) private readonly pricingRepo: Repository<ItineraryPricingEntity>,
    @InjectRepository(GroupDiscountEntity) private readonly discountRepo: Repository<GroupDiscountEntity>,
  ) {}

  async create(dto: CreateItineraryDto): Promise<ItineraryEntity> {
    const itinerary = this.repo.create({
      parentId: dto.parentId, parentType: dto.parentType,
      title: dto.title, description: dto.description, totalDays: dto.totalDays,
    });
    const saved = await this.repo.save(itinerary);

    if (dto.days?.length) {
      const days = dto.days.map((d) => this.dayRepo.create({ ...d, itineraryId: saved.id }));
      await this.dayRepo.save(days);
    }

    if (dto.pricingTiers?.length) {
      for (const tier of dto.pricingTiers) {
        // Validate group discount pax ranges don't overlap
        if (tier.groupDiscounts?.length) {
          this.validateGroupDiscounts(tier.groupDiscounts);
        }
        const pricing = this.pricingRepo.create({
          itineraryId: saved.id, label: tier.label,
          basePrice: tier.basePrice, currency: tier.currency,
          validFrom: tier.validFrom ? new Date(tier.validFrom) : null,
          validTo: tier.validTo ? new Date(tier.validTo) : null,
        });
        const savedPricing = await this.pricingRepo.save(pricing);

        if (tier.groupDiscounts?.length) {
          const discounts = tier.groupDiscounts.map((g) =>
            this.discountRepo.create({ ...g, pricingId: savedPricing.id }),
          );
          await this.discountRepo.save(discounts);
        }
      }
    }

    return this.findOne(saved.id);
  }

  async findByParent(parentId: string, parentType: string): Promise<ItineraryEntity[]> {
    return this.repo.find({
      where: { parentId, parentType },
      relations: ['days', 'pricingTiers', 'pricingTiers.groupDiscounts'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ItineraryEntity> {
    const itin = await this.repo.findOne({
      where: { id },
      relations: ['days', 'pricingTiers', 'pricingTiers.groupDiscounts'],
    });
    if (!itin) throw new NotFoundException(`Itinerary ${id} not found`);
    return itin;
  }

  async update(id: string, dto: UpdateItineraryDto): Promise<ItineraryEntity> {
    const itin = await this.findOne(id);
    Object.assign(itin, dto);
    await this.repo.save(itin);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  /**
   * Server-side price calculator.
   * Formula: (basePrice * pax * groupDiscountMultiplier) + sum(optionalActivity.extraPrice * pax)
   */
  async calculatePrice(dto: CalculatePriceDto): Promise<{
    basePrice: number; pax: number; discount: number;
    subtotal: number; optionalActivitiesTotal: number; total: number; currency: string;
  }> {
    const pricing = await this.pricingRepo.findOne({
      where: { id: dto.pricingTierId },
      relations: ['groupDiscounts', 'itinerary'],
    });
    if (!pricing) throw new NotFoundException(`Pricing tier ${dto.pricingTierId} not found`);

    const basePrice = Number(pricing.basePrice);
    const pax = dto.pax;

    // Find applicable group discount
    let discountMultiplier = 1;
    let discountAmount = 0;
    if (pricing.groupDiscounts?.length) {
      const applicable = pricing.groupDiscounts.find(
        (g) => pax >= g.minPax && pax <= g.maxPax,
      );
      if (applicable) {
        if (applicable.discountType === 'percentage') {
          discountMultiplier = 1 - Number(applicable.discountValue) / 100;
          discountAmount = basePrice * pax * (Number(applicable.discountValue) / 100);
        } else {
          discountAmount = Number(applicable.discountValue) * pax;
          discountMultiplier = (basePrice * pax - discountAmount) / (basePrice * pax);
        }
      }
    }

    const subtotal = basePrice * pax * discountMultiplier;

    // Calculate optional activities cost
    let optionalActivitiesTotal = 0;
    if (dto.optionalActivityIds?.length && pricing.itinerary) {
      // Query activity links based on parent type
      const parentType = pricing.itinerary.parentType;
      const parentId = pricing.itinerary.parentId;
      const tableName = parentType === 'tour' ? 'tour_activities' : 'trek_activities';
      const fkColumn = parentType === 'tour' ? 'tour_id' : 'trek_id';

      // Use raw query since we're in tenant schema context
      const links: any[] = await this.repo.manager.query(
        `SELECT extra_price FROM ${tableName} WHERE ${fkColumn} = $1 AND activity_id = ANY($2) AND inclusion_type = 'optional'`,
        [parentId, dto.optionalActivityIds],
      );
      optionalActivitiesTotal = links.reduce((sum, l) => sum + Number(l.extra_price) * pax, 0);
    }

    return {
      basePrice, pax, discount: discountAmount,
      subtotal, optionalActivitiesTotal,
      total: subtotal + optionalActivitiesTotal,
      currency: pricing.currency,
    };
  }

  private validateGroupDiscounts(discounts: { minPax: number; maxPax: number }[]): void {
    const sorted = [...discounts].sort((a, b) => a.minPax - b.minPax);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].minPax <= sorted[i - 1].maxPax) {
        throw new BadRequestException(
          `Group discount pax ranges overlap: [${sorted[i - 1].minPax}-${sorted[i - 1].maxPax}] and [${sorted[i].minPax}-${sorted[i].maxPax}]`,
        );
      }
    }
  }
}
