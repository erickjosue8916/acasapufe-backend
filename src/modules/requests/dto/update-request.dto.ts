import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RequestStatus } from '../entities/request.entity';
import { CreateRequestDto } from './create-request.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  @IsEnum(RequestStatus)
  @ApiProperty({
    name: 'status',
    enum: RequestStatus,
    example: RequestStatus.APPROVED,
  })
  status: RequestStatus;
}
