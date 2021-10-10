import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, isNotEmpty, IsString } from 'class-validator';
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
    example: 'User',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({
    name: 'lastName',
    example: 'Test #',
  })
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @ApiProperty({
    name: 'username',
    example: `userTest001`,
  })
  @IsNotEmpty()
  username: string;

  @IsString()
  @ApiProperty({
    name: 'dui',
    example: '000000000',
  })
  @IsNotEmpty()
  dui: string;

  @IsString()
  @ApiProperty({
    name: 'birthDate',
    example: '08-02-1999',
  })
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @ApiProperty({
    name: 'password',
    example: '123',
  })
  @IsNotEmpty()
  password: string;
}
