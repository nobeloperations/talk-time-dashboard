import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';

@Module({
  imports: [DatabaseUtilsModule],
  providers: [UserService],
  controllers: [UsersController]
})
export class UsersModule {}
