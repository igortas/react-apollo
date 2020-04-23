import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * We bootstraping the app here, we enabled cors because it can be runned with docker-compose
 * Port can be binded dynamically from .env file in the root project
 * All the feature are in seperate folder like auth, category etc...
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
