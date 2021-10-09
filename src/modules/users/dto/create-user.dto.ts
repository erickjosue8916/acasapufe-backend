import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserTypes } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    name: 'type',
    enum: UserTypes,
  })
  @IsEnum(UserTypes)
  type: UserTypes;

  @ApiProperty({
    name: 'name',
  })
  @IsString()
  name: string;

  @IsString()
  @ApiProperty({
    name: 'lastName',
  })
  lastName: string;

  @IsString()
  @ApiProperty({
    name: 'username',
  })
  username: string;

  @IsString()
  @ApiProperty({
    name: 'dui',
  })
  dui: string;

  @IsString()
  @ApiProperty({
    name: 'birthDate',
  })
  birthDate: string;

  @IsString()
  @ApiProperty({
    name: 'password',
  })
  password: string;
}
