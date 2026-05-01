import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.MEDIA_SERVICE_PORT || 4005;
  await app.listen(port);
  console.log(`Media Service running on port ${port}`);
}
bootstrap();
