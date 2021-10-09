import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './infrastructure/config/env.validation';
import { configurations } from './infrastructure/config/index';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      load: configurations(),
    }),
    UsersModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
