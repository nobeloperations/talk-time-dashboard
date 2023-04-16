import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackSchema } from '../../models/feedback.model';
import { UserSchema } from '../../models/user.model';
import { MeetingSchema } from 'models/meeting.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Feedback', schema: FeedbackSchema}, {name: 'User', schema: UserSchema}, {name: 'Meeting', schema: MeetingSchema}])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
