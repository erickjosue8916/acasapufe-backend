import { PartialType } from '@nestjs/swagger';
import { CreateCounterLogDto } from './create-counter-log.dto';

export class UpdateCounterLogDto extends PartialType(CreateCounterLogDto) {}
