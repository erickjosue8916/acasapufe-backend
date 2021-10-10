import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CounterLogsService } from './counter-logs.service';
import { CreateCounterLogDto } from './dto/create-counter-log.dto';
import { UpdateCounterLogDto } from './dto/update-counter-log.dto';

@Controller('api/v1/counter-logs')
@ApiTags('counter-logs')
export class CounterLogsController {
  constructor(private readonly counterLogsService: CounterLogsService) {}

  @Post()
  create(@Body() createCounterLogDto: CreateCounterLogDto) {
    return this.counterLogsService.create(createCounterLogDto);
  }

  @Get()
  findAll() {
    return this.counterLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.counterLogsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCounterLogDto: UpdateCounterLogDto,
  ) {
    return this.counterLogsService.update(+id, updateCounterLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.counterLogsService.remove(+id);
  }
}
