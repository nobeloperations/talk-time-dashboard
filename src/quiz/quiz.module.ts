import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';

@Module({
  providers: [QuizService],
  controllers: [QuizController],
  imports: [DatabaseUtilsModule]
})
export class QuizModule {}
