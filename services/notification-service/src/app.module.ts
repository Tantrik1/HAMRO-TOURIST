import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { EmailModule } from './email/email.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { NewsletterSubscriber } from './newsletter/newsletter-subscriber.entity';

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
        entities: [NewsletterSubscriber],
        synchronize: false,
        schema: 'public',
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get('REDIS_PORT', 6379),
        },
      }),
    }),
    EmailModule,
    NewsletterModule,
  ],
})
export class AppModule {}
