import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteModule } from './website/website.module';
import { WebsiteConfigEntity } from './entities/website-config.entity';

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
        entities: [WebsiteConfigEntity],
        synchronize: false,
      }),
    }),
    WebsiteModule,
  ],
})
export class AppModule {}
