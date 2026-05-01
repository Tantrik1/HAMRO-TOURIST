import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('website_configs')
export class WebsiteConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'theme_id', type: 'varchar', length: 50, default: 'adventure-bold' })
  themeId: string;

  @Column({ name: 'seo_title', type: 'varchar', length: 255, nullable: true })
  seoTitle: string | null;

  @Column({ name: 'seo_description', type: 'text', nullable: true })
  seoDescription: string | null;

  @Column({ name: 'favicon_url', type: 'varchar', length: 1024, nullable: true })
  faviconUrl: string | null;

  @Column({ name: 'primary_color', type: 'varchar', length: 20, default: '#7C3AED' })
  primaryColor: string;

  @Column({ name: 'secondary_color', type: 'varchar', length: 20, default: '#06B6D4' })
  secondaryColor: string;

  @Column({ name: 'accent_color', type: 'varchar', length: 20, default: '#F97316' })
  accentColor: string;

  @Column({ name: 'heading_font', type: 'varchar', length: 100, default: 'Syne' })
  headingFont: string;

  @Column({ name: 'body_font', type: 'varchar', length: 100, default: 'DM Sans' })
  bodyFont: string;

  @Column({ type: 'jsonb', default: '[]' })
  sections: any[];

  @Column({ name: 'nav_links', type: 'jsonb', default: '[]' })
  navLinks: any[];

  @Column({ name: 'footer_links', type: 'jsonb', default: '[]' })
  footerLinks: any[];

  @Column({ name: 'social_links', type: 'jsonb', default: '[]' })
  socialLinks: any[];

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
