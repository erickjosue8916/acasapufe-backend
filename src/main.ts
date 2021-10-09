import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const port = process.env.PORT || 80;
    const app = await NestFactory.create(AppModule);

    const swaggerConfig = new DocumentBuilder()
      .setTitle(`ACASAPUFE REST API`)
      .setDescription(`Rest Api to manage all resources of ACASAPUFE Services`)
      .setVersion('1.0')
      .addTag('customers', 'Module of customers for company')
      .addTag('issues', 'Pending ask of users')
      .addTag('users', 'Accounting with access for project')
      .addTag('invoices', 'Consume of service per users')
      .addTag('requests', 'Potential clients, pending of revision')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    await app.listen(port, () => {
      console.log(`Server Running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
