import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuilderController } from './builder.controller';
import { BuilderService } from './builder.service';
import { BuilderThemeEntity } from './entities/builder-theme.entity';
import { BuilderPageEntity } from './entities/builder-page.entity';
import { BuilderSectionEntity } from './entities/builder-section.entity';
import { BuilderSnapshotEntity } from './entities/builder-snapshot.entity';
import { BuilderSettingsEntity } from './entities/builder-settings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuilderThemeEntity,
      BuilderPageEntity,
      BuilderSectionEntity,
      BuilderSnapshotEntity,
      BuilderSettingsEntity,
    ]),
  ],
  controllers: [BuilderController],
  providers: [BuilderService],
  exports: [BuilderService],
})
export class BuilderModule {}
