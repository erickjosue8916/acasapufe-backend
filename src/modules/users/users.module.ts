import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MainDbService],
})
export class UsersModule {}
