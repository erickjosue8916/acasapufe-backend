import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationCustomerDuiDuplicatedPipe } from '../customers/pipes/validation-customer-dui-duplicated.pipe';
import { RequestByIdPipe } from './pipes/request-by-id.pipe';
import { RequestStatus } from './entities/request.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/infrastructure/config/auth/roles.decorator';
import { Role } from 'src/infrastructure/config/auth/role.enum';

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
  async findOne(@Param('id', RequestByIdPipe) request) {
    return request;
  }

  @ApiParam({
    name: 'id',
    description: 'Request Id saved in database',
  })
  @ApiParam({
    name: 'status',
    description: 'New Request Status',
    enum: RequestStatus,
  })
  @Patch(':id/:status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
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
