import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // No global 'api' prefix: api-gateway forwards /api/bookings/... → /bookings/...

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Booking Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = process.env.BOOKING_SERVICE_PORT || 4010;
  await app.listen(port);
  console.log(`Booking Service running on port ${port}`);
}
bootstrap();
