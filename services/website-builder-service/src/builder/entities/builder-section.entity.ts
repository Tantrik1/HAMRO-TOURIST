import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { BuilderPageEntity } from './builder-page.entity';

@Entity('builder_sections')
export class BuilderSectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  sectionType: string;

  @Column({ type: 'varchar', length: 200 })
  label: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @Column({ type: 'jsonb', default: '{}' })
  config: Record<string, any>;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parentSectionId: string | null;

  @Column({ type: 'varchar', length: 50, default: 'standard' })
  variant: string;

  @ManyToOne(() => BuilderPageEntity, (page) => page.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'page_id' })
  page: BuilderPageEntity;

  @Column({ type: 'uuid' })
  @Index()
  pageId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
