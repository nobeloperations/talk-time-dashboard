import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';

@Module({
  imports: [DatabaseUtilsModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
