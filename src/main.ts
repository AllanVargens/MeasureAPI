import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validateConfig } from 'validate.config';
import { INestApplication } from '@nestjs/common';

function setupSwagger(app: INestApplication){
  const config = new DocumentBuilder()
  .setTitle("MeasureAPI - Gemini")
  .setDescription("Uma api para fazer medicoes de agua e gas atraves de imagens e IA")
  .setVersion("1.0")
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(validateConfig);
  setupSwagger(app)
  await app.listen(3000);
}
bootstrap();
