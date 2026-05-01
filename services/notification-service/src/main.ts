import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NOTIFICATION_SERVICE_PORT || 4008;
  await app.listen(port);
  console.log(`Notification Service running on port ${port}`);
}
bootstrap();
