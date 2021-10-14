import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'username',
    example: 'user-123',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    example: '123',
  })
  password: string;
}
