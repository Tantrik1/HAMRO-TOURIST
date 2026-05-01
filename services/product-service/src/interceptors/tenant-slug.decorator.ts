import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantSlug = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-tenant-slug'] || request.user?.tenantSlug;
  },
);
