import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';

@Module({
  providers: [FeedbacksService],
  controllers: [FeedbacksController],
  imports: [DatabaseUtilsModule]
})
export class FeedbacksModule {}
