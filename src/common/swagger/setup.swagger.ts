import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export function setupSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Email Delivery API')
      .setDescription(
        'A lightweight microservice built with NestJS for sending personal emails. It provides a simple API to trigger email delivery for personal projects.',
      )
      .addBearerAuth()
      .setVersion('1.0')
      .build(),
  );
  const theme = new SwaggerTheme();
  SwaggerModule.setup('/api', app, document, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
