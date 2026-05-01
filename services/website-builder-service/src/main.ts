import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Hamro Tourist Website Builder Service')
    .setDescription('Website configuration, themes, sections, and publishing')
    .setVersion('1.0').addBearerAuth().build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  const port = process.env.WEBSITE_BUILDER_SERVICE_PORT || 4004;
  await app.listen(port);
  console.log(`Website Builder Service running on port ${port}`);
}
bootstrap();
