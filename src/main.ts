import { NestFactory } from '@nestjs/core';
import { swaggerSetup } from './infrastructure/swagger';
import { AppModule } from './app.module';
import { ValidationRequestPipe } from './infrastructure/pipes/validation-request.pipe';

async function bootstrap() {
  try {
    const port = process.env.PORT || 80;
    const app = await NestFactory.create(AppModule);

    swaggerSetup(app, `docs`);

    app.useGlobalPipes(new ValidationRequestPipe());

    await app.listen(port, () => {
      console.log(`Server Running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
