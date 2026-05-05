import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('builder_settings')
export class BuilderSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, default: 'adventure-bold' })
  activeThemeKey: string;

  @Column({ type: 'jsonb', default: '{}' })
  colors: Record<string, string>;

  @Column({ type: 'jsonb', default: '{}' })
  fonts: Record<string, string>;

  @Column({ type: 'varchar', length: 255, nullable: true })
  faviconUrl: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logoUrl: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ogImageUrl: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  googleAnalyticsId: string | null;

  @Column({ type: 'jsonb', default: '[]' })
  customCss: string[];

  @Column({ type: 'jsonb', default: '[]' })
  customHeadScripts: string[];

  @Column({ type: 'jsonb', default: '{}' })
  seoDefaults: Record<string, string>;

  @Column({ type: 'varchar', length: 100, nullable: true })
  navbarVariant: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  footerVariant: string | null;

  @Column({ type: 'jsonb', default: '[]' })
  navLinks: Array<{
    label: string;
    href: string;
    target?: string;
    children?: Array<{ label: string; href: string; target?: string; description?: string }>;
  }>;

  @Column({ type: 'jsonb', default: '[]' })
  footerColumns: Array<{ title: string; items: Array<{ label: string; href: string; target?: string }> }>;

  @Column({ type: 'jsonb', default: '{}' })
  socialLinks: Record<string, string>;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
