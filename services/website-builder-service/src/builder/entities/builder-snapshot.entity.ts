import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

export type SnapshotType = 'publish' | 'auto' | 'manual';

@Entity('builder_snapshots')
export class BuilderSnapshotEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 50, default: 'manual' })
  snapshotType: SnapshotType;

  @Column({ type: 'jsonb', default: '[]' })
  pages: Array<{
    id: string;
    slug: string;
    label: string;
    status: string;
    sections: Array<{
      id: string;
      sectionType: string;
      label: string;
      enabled: boolean;
      config: Record<string, any>;
      sortOrder: number;
      variant: string;
    }>;
  }>;

  @Column({ type: 'jsonb', default: '{}' })
  themeOverrides: Record<string, any>;

  @Column({ type: 'varchar', length: 100 })
  themeKey: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  publishedByUserId: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  publishedByName: string | null;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  isLive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
