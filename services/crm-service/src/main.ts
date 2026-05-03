import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // No global 'api' prefix: api-gateway forwards /api/crm/... → /crm/...

  const swaggerConfig = new DocumentBuilder()
    .setTitle('CRM Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = process.env.CRM_SERVICE_PORT || 4007;
  await app.listen(port);
  console.log(`CRM Service running on port ${port}`);
}
bootstrap();
