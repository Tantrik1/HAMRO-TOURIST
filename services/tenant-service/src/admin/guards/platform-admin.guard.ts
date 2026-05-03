import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '@hamrotourist/shared-types';

/**
 * Guard that restricts access to platform_admin role only.
 * Reads role from the X-User-Role header set by the API gateway
 * after JWT verification, or from the decoded JWT payload.
 */
@Injectable()
export class PlatformAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role =
      request.user?.role ||
      request.headers['x-user-role'];

    if (role !== UserRole.PLATFORM_ADMIN) {
      throw new ForbiddenException('Platform admin access required');
    }
    return true;
  }
}
