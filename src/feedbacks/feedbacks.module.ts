import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackSchema } from 'models/feedback.model';
import { UserSchema } from 'models/user.model';

@Module({
  providers: [FeedbacksService],
  controllers: [FeedbacksController],
  imports: [MongooseModule.forFeature([{name: 'Feedback', schema: FeedbackSchema}, {name: 'User', schema: UserSchema}])]
})
export class FeedbacksModule {}
