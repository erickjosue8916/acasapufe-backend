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
import { ApiTags } from '@nestjs/swagger';
import { ValidationCustomerDuiDuplicatedPipe } from '../customers/pipes/validation-customer-dui-duplicated.pipe';
import { RequestByIdPipe } from './pipes/request-by-id.pipe';

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
    @Param('id', RequestByIdPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return this.requestsService.update(id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}
