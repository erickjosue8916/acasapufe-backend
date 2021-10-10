import { Global, Module } from '@nestjs/common';
import { MainDbService } from './main-db/main-db.service';

@Global()
@Module({
  providers: [MainDbService],
})
export class CommonModule {}
