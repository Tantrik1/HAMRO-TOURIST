import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '@hamrotourist/shared-types';
import { WebsiteModule } from './website/website.module';
import { BuilderModule } from './builder/builder.module';
import { WebsiteConfigEntity } from './entities/website-config.entity';
import { BuilderThemeEntity } from './builder/entities/builder-theme.entity';
import { BuilderPageEntity } from './builder/entities/builder-page.entity';
import { BuilderSectionEntity } from './builder/entities/builder-section.entity';
import { BuilderSnapshotEntity } from './builder/entities/builder-snapshot.entity';
import { BuilderSettingsEntity } from './builder/entities/builder-settings.entity';

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
          WebsiteConfigEntity,
          BuilderThemeEntity,
          BuilderPageEntity,
          BuilderSectionEntity,
          BuilderSnapshotEntity,
          BuilderSettingsEntity,
        ],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    WebsiteModule,
    BuilderModule,
  ],
})
export class AppModule {}
