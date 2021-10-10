import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateCounterLogDto {
  @IsInt()
  @ApiProperty({
    name: 'count',
    examples: [1000, 2000, 3000],
  })
  count: number;
}
