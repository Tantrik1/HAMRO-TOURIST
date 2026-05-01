import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantSlug = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().headers['x-tenant-slug'];
});
