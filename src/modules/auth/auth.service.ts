import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

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
    return result;
  }
}
