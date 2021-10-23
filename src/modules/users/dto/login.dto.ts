import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'username',
    example: '000-000-000',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    example: '000-000-000',
  })
  password: string;
}
