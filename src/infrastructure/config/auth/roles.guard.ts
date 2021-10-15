import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.authorization) {
      throw new HttpException(
        `Access Token not provided`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const [, token] = headers.authorization.split(' ');
    const user: any = await this.jwt.decode(token);
    const accessGranted = requiredRoles.some((role) =>
      user.roles?.includes(role),
    );
    if (!accessGranted) {
      throw new HttpException(
        `Required roles to access to this resource: ${requiredRoles.join(',')}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
