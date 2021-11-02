import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    name: 'firstName',
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
    name: 'phone',
    example: '+50371021375',
  })
  @IsNotEmpty()
  phone: string;

  @IsString()
  @ApiProperty({
    name: 'locationReference',
    example: 'Al lado de la escuela',
  })
  @IsNotEmpty()
  locationReference: string;
}
