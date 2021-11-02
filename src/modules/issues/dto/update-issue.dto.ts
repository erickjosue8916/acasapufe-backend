import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ISSUE_STATUS } from '../entities/issue.entity';
import { CreateIssueDto } from './create-issue.dto';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
  @IsEnum(ISSUE_STATUS)
  @ApiProperty({
    name: 'status',
    enum: ISSUE_STATUS,
  })
  status: ISSUE_STATUS;
}
