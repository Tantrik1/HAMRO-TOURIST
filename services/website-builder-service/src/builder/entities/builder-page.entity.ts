import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany, JoinColumn,
} from 'typeorm';
import { BuilderSectionEntity } from './builder-section.entity';

export type PageStatus = 'draft' | 'published' | 'archived';

@Entity('builder_pages')
export class BuilderPageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 200 })
  label: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  navLabel: string | null;

  @Column({ type: 'text', nullable: true })
  metaTitle: string | null;

  @Column({ type: 'text', nullable: true })
  metaDescription: string | null;

  @Column({ type: 'boolean', default: false })
  isHome: boolean;

  @Column({ type: 'boolean', default: true })
  showInNav: boolean;

  @Column({ type: 'boolean', default: false })
  showInFooter: boolean;

  @Column({ type: 'varchar', length: 50, default: 'draft' })
  status: PageStatus;

  @Column({ type: 'varchar', length: 100, default: 'classic' })
  navbarVariant: string;

  @Column({ type: 'varchar', length: 100, default: 'mega' })
  footerVariant: string;

  @Column({ type: 'jsonb', nullable: true })
  themeOverrides: Record<string, any> | null;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @OneToMany(() => BuilderSectionEntity, (s) => s.page, { cascade: true })
  @JoinColumn()
  sections: BuilderSectionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
