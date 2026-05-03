import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from '@hamrotourist/shared-types';

@Injectable()
export class JwtValidationMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.slice(7);
    try {
      const rawKey = this.config.get<string>('JWT_PUBLIC_KEY');
      const publicKey = rawKey ? Buffer.from(rawKey, 'base64').toString() : null;
      if (!publicKey) {
        return next();
      }

      const decoded = jwt.verify(token, publicKey!, {
        algorithms: ['RS256'],
      }) as JwtPayload;

      (req as any).user = decoded;

      // Inject tenant slug from JWT into header for downstream services
      if (decoded.tenantSlug) {
        req.headers['x-tenant-slug'] = decoded.tenantSlug;
      }
    } catch {
      // Token invalid — continue without user context (public endpoints)
    }

    next();
  }
}
