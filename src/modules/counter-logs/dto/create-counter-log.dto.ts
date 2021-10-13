import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCounterLogDto {
  @IsNumber()
  @ApiProperty({
    name: 'count',
    examples: [1000, 2000, 3000],
  })
  count: number;
}
