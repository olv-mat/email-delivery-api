import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/setup.swagger';
import { Environments } from './modules/enums/environments.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
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
