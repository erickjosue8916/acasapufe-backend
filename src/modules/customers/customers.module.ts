import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CounterLogsModule } from '../counter-logs/counter-logs.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { RolesGuard } from 'src/infrastructure/config/auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    CounterLogsModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    MainDbService,
    UsersService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CustomersModule {}
