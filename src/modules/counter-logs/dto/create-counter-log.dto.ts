import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCounterLogDto {
  @IsNumber()
  @ApiProperty({
    name: 'count',
    examples: [1000, 2000, 3000],
  })
  count: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'date',
    examples: ['2021-11-09'],
  })
  date: string;
}
