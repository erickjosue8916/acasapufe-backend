import { NestFactory } from '@nestjs/core';
import { swaggerSetup } from './infrastructure/swagger';
import { AppModule } from './app.module';
import { ValidationRequestPipe } from './infrastructure/pipes/validation-request.pipe';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  try {
    const port = process.env.PORT || 80;

    console.log(port)
    const app = await NestFactory.create(AppModule);

    swaggerSetup(app, `docs`);

    app.useGlobalPipes(new ValidationRequestPipe());

    app.enableCors();

    await app.listen(port, () => {
      console.log(`Server Running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
