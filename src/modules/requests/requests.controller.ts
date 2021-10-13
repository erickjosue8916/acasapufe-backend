import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ValidationCustomerDuiDuplicatedPipe } from '../customers/pipes/validation-customer-dui-duplicated.pipe';
import { RequestByIdPipe } from './pipes/request-by-id.pipe';
import { RequestStatus } from './entities/request.entity';

@Controller('api/v1/requests')
@ApiTags('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(
    @Body(ValidationCustomerDuiDuplicatedPipe)
    createRequestDto: CreateRequestDto,
  ) {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', RequestByIdPipe) request,
    @Param('status') status: RequestStatus,
  ) {
    return this.requestsService.updateStatus(request, status);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}
