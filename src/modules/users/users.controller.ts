import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { UserLoginPipe } from './pipes/user-login.pipe';
import { LoginDTO } from './dto/login.dto';

@ApiTags('users')
@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('users/:id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('users/:id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
