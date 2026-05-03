import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TenantContextInterceptor.name);
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const slug = req.headers['x-tenant-slug'] || req.user?.tenantSlug;

    if (!slug) {
      throw new UnauthorizedException('Missing tenant context');
    }

    // ✅ STRICT VALIDATION - prevent SQL injection
    if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) || slug.length < 3 || slug.length > 63) {
      throw new BadRequestException('Invalid tenant slug format');
    }

    // ✅ Safe schema name generation
    const schema = `tenant_${slug.replace(/-/g, '_')}`;

    try {
      // ✅ Use parameterized query (TypeORM handles escaping)
      await this.dataSource.query(`SET search_path TO $1`, [schema]);
    } catch (error) {
      this.logger.error(`Failed to set schema for ${slug}:`, error);
      throw new InternalServerErrorException('Database configuration error');
    }

    return next.handle().pipe(
      tap({
        finalize: async () => {
          await this.dataSource.query('SET search_path TO public');
        },
      }),
    );
  }
}
