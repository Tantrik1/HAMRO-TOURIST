import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUES } from '@hamrotourist/shared-types';
import { NewsletterSubscriber } from './newsletter-subscriber.entity';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    @InjectRepository(NewsletterSubscriber) private repo: Repository<NewsletterSubscriber>,
    @InjectQueue(QUEUES.EMAIL) private emailQueue: Queue,
  ) {}

  async subscribe(email: string, name?: string, tenantSlug?: string) {
    let sub = await this.repo.findOne({ where: { email } });
    if (sub) {
      sub.status = 'subscribed';
      sub.name = name || sub.name;
      sub.unsubscribedAt = null;
      return this.repo.save(sub);
    }
    return this.repo.save(this.repo.create({
      email,
      name: name || null,
      tenantSlug: tenantSlug || null,
      status: 'subscribed',
    }));
  }

  async unsubscribe(email: string) {
    const sub = await this.repo.findOne({ where: { email } });
    if (sub) {
      sub.status = 'unsubscribed';
      sub.unsubscribedAt = new Date();
      return this.repo.save(sub);
    }
    return null;
  }

  async findAll(page = 1, limit = 20, status?: string, tenantSlug?: string) {
    const qb = this.repo.createQueryBuilder('sub')
      .orderBy('sub.subscribedAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (status) qb.andWhere('sub.status = :status', { status });
    if (tenantSlug) qb.andWhere('sub.tenantSlug = :tenantSlug', { tenantSlug });

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const subscribed = await this.repo.count({ where: { status: 'subscribed' } });
    const unsubscribed = await this.repo.count({ where: { status: 'unsubscribed' } });
    return { totalSubscribed: subscribed, totalUnsubscribed: unsubscribed };
  }

  async sendBroadcast(subject: string, body: string, tenantSlug?: string) {
    const qb = this.repo.createQueryBuilder('sub')
      .where('sub.status = :status', { status: 'subscribed' });
    if (tenantSlug) qb.andWhere('sub.tenantSlug = :tenantSlug', { tenantSlug });

    const subscribers = await qb.getMany();
    let queued = 0;

    for (const sub of subscribers) {
      await this.emailQueue.add('newsletter-broadcast', {
        type: 'newsletter-broadcast',
        to: sub.email,
        payload: { subject, body, name: sub.name },
      });
      queued++;
    }

    this.logger.log(`Broadcast queued for ${queued} subscribers`);
    return { queued };
  }
}
