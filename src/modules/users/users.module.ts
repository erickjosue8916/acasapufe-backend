import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Module({
  imports: [CommonModule],
  controllers: [UsersController],
  providers: [UsersService, MainDbService],
})
export class UsersModule {}
