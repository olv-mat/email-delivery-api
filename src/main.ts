import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import { Environments } from './modules/enums/environments.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Email Delivery API')
      .setDescription(
        'A lightweight microservice built with NestJS for sending personal emails. It provides a simple API to trigger email delivery for personal projects.',
      )
      .setVersion('1.0')
      .build(),
  );
  const theme = new SwaggerTheme();
  SwaggerModule.setup('/api', app, document, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  if (process.env.NODE_ENV === Environments.PRODUCTION) {
    app.use(helmet());
    app.enableCors({});
  }
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
