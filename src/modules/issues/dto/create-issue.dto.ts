import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  @ApiProperty()
  description: string;
}
