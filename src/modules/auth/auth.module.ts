import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { jwt } from 'src/infrastructure/config/jwt.config';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, MainDbService, JwtStrategy],
})
export class AuthModule {}
