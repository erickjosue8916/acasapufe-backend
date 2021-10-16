import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiTags,
} from '@nestjs/swagger';
import { UserLoginPipe } from './pipes/user-login.pipe';
import { LoginDTO } from './dto/login.dto';
import { ValidationUserDuiDuplicatedPipe } from './pipes/validation-user-dui-duplicated.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/infrastructure/config/auth/roles.decorator';
import { Role } from 'src/infrastructure/config/auth/role.enum';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationUserDuiDuplicatedPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
