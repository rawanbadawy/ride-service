import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(3006); 
  console.log('Ride Service is running on: http://localhost:3006');
  console.log('✅ ZoneResolver loaded');

}
bootstrap();