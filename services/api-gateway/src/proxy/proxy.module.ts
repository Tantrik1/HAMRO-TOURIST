import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { JwtValidationMiddleware } from '../middleware/jwt-validation.middleware';

@Module({
  imports: [HttpModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtValidationMiddleware).forRoutes('*');
  }
}
