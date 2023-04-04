import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackSchema } from '../../models/feedback.model';
import { UserSchema } from '../../models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Feedback', schema: FeedbackSchema}, {name: 'User', schema: UserSchema}])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
