import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';

@Module({
  imports: [DatabaseUtilsModule],
  providers: [MainService],
  controllers: [MainController]
})
export class MainModule {}
