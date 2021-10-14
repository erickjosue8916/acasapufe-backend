import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './infrastructure/config/env.validation';
import { configurations } from './infrastructure/config/index';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { CommonModule } from './common/common.module';
import { IssuesModule } from './modules/issues/issues.module';
import { RequestsModule } from './modules/requests/requests.module';
import { CounterLogsModule } from './modules/counter-logs/counter-logs.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      load: configurations(),
      isGlobal: true,
    }),
    UsersModule,
    CustomersModule,
    CommonModule,
    IssuesModule,
    RequestsModule,
    CounterLogsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
