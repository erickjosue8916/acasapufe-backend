import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiHideProperty,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCounterLogDto } from '../counter-logs/dto/create-counter-log.dto';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerByIdPipe } from './pipes/customer-by-id.pipe';
import { ValidationCustomerDuiDuplicatedPipe } from './pipes/validation-customer-dui-duplicated.pipe';

@ApiTags('customers')
@Controller('api/v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(
    @Body(ValidationCustomerDuiDuplicatedPipe)
    createCustomerDto: CreateCustomerDto,
  ) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
  })
  findOne(@Param('id', CustomerByIdPipe) customerEntity: any) {
    console.log(customerEntity);
    return 'ok';
  }

  @Patch(':id')
  @ApiHideProperty()
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }

  @ApiParam({
    name: 'customerId',
  })
  @Post(':id/counter-logs')
  async createLog(
    @Param('id', CustomerByIdPipe) customerEntity: any,
    @Body() counterLog: CreateCounterLogDto,
  ) {
    const result = await this.customersService.createCounterLog(
      customerEntity,
      counterLog,
    );
    return result;
  }
}
