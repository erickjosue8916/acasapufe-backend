import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, MainDbService, JwtStrategy],
})
export class UsersModule {}
