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
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiHeaders,
  ApiHideProperty,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/infrastructure/config/auth/role.enum';
import { Roles } from 'src/infrastructure/config/auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCounterLogDto } from '../counter-logs/dto/create-counter-log.dto';
import { CreateIssueDto } from '../issues/dto/create-issue.dto';
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  create(
    @Body(ValidationCustomerDuiDuplicatedPipe)
    createCustomerDto: CreateCustomerDto,
  ) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiBearerAuth('Only Admin and Employee Logged')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
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
  @ApiExcludeEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }

  @ApiParam({
    name: 'id',
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

  @ApiParam({
    name: 'id',
  })
  @Get(':id/counter-logs')
  async getCounterLogs(@Param('id', CustomerByIdPipe) customer) {
    const result = await this.customersService.getCounterLogs(customer);
    return result;
  }

  @ApiParam({
    name: 'id',
  })
  @Get(':id/counter-logs/char')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  async getCounterLogsChar(@Param('id', CustomerByIdPipe) customer) {
    const result = await this.customersService.getCounterLogs(customer);
    const char = result.reduce(
      (prev, current, index) => {
        const [year, month] = current.id.split('-');
        prev.months[index] = `${year}/${month}`;
        prev.values[index] = current.count;
        return prev;
      },
      { months: [], values: [] },
    );
    return char;
  }

  @ApiParam({
    name: 'id',
  })
  @Post(':id/issues')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  async createIssue(
    @Param('id', CustomerByIdPipe) customerEntity: any,
    @Body() issue: CreateIssueDto,
  ) {
    const result = await this.customersService.createIssue(
      customerEntity,
      issue,
    );
    return result;
  }

  @ApiParam({
    name: 'id',
  })
  @Get(':id/issues')
  async getIssues(@Param('id', CustomerByIdPipe) customerEntity: any) {
    const result = await this.customersService.getIssues(customerEntity);
    return result;
  }
}
