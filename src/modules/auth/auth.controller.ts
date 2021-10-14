import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../users/dto/login.dto';
import { UserLoginPipe } from '../users/pipes/user-login.pipe';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({
    type: LoginDTO,
  })
  async login(@Body(UserLoginPipe) user) {
    const result = await this.authService.login(user);
    return result;
  }
}
