import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const slug = req.headers['x-tenant-slug'];
    if (!slug) throw new UnauthorizedException('Missing tenant context');
    const schema = `tenant_${slug.replace(/[^a-z0-9_-]/gi, '_').replace(/-/g, '_')}`;
    await this.dataSource.query(`SET search_path TO "${schema}"`);
    return next.handle().pipe(
      finalize(async () => {
        await this.dataSource.query('SET search_path TO "public"');
      }),
    );
  }
}
