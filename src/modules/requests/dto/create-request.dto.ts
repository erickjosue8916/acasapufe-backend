import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({
    name: 'name',
    example: 'User',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty({
    name: 'lastName',
    example: 'Test #',
  })
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @ApiProperty({
    name: 'dui',
    example: '000000000',
  })
  @IsNotEmpty()
  dui: string;

  @IsString()
  @ApiProperty({
    name: 'telephone',
    example: '+50371021375',
  })
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @ApiProperty({
    name: 'locationReference',
    example: 'Al lado de la escuela',
  })
  @IsNotEmpty()
  locationReference: string;
}