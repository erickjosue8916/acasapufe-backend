import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication, documentPath: string) => {
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
  SwaggerModule.setup(documentPath, app, document);
};
