import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserTypes } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async login(user) {
    delete user.password;
    user.roles = [user.type];
    const access_token = this.jwt.sign(user, {
      secret: this.config.get('jwt.secretKey'),
    });
    const result = {
      ...user,
      access_token,
    };

    if (user.type === UserTypes.Employee) {
      delete result.roles;
      delete result.access_token;
    }
    return result;
  }
}
