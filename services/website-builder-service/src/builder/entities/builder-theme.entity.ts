import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('builder_themes')
export class BuilderThemeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  key: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 50, default: 'builtin' })
  source: 'builtin' | 'custom' | 'marketplace';

  @Column({ type: 'boolean', default: false })
  isPremium: boolean;

  @Column({ type: 'jsonb', default: '{}' })
  colorDefaults: Record<string, string>;

  @Column({ type: 'jsonb', default: '{}' })
  fontDefaults: Record<string, string>;

  @Column({ type: 'jsonb', default: '[]' })
  allowedSections: string[];

  @Column({ type: 'jsonb', default: '[]' })
  defaultNavLinks: Array<{ label: string; href: string; children?: any[] }>;

  @Column({ type: 'jsonb', default: '[]' })
  defaultFooterColumns: Array<{ title: string; items: any[] }>;

  @Column({ type: 'varchar', length: 50, default: 'classic' })
  defaultNavbarVariant: string;

  @Column({ type: 'varchar', length: 50, default: 'mega' })
  defaultFooterVariant: string;

  @Column({ type: 'text', nullable: true })
  previewImageUrl: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
