import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Habilita todos los niveles
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setGlobalPrefix(`/api/v1`);
  app.enableCors();
  // app.use(cookieParser());

  /* # # # SETTINGS # # # */
  const PORT = process.env.PORT || 3500;

  await app.listen(PORT);
  console.log(`SERVER RUNNIG PORT: ${PORT}`)
}
bootstrap();
