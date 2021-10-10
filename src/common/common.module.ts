import { Module } from '@nestjs/common';
import { MainDbService } from './main-db/main-db.service';

@Module({
  providers: [MainDbService],
})
export class CommonModule {}
