import { Module } from '@nestjs/common';
import { DatabaseUtilsService } from './database-utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'models/user.model';
import { MeetingSchema } from 'models/meeting.model';
import { NoteSchema } from 'models/note.model';
import { FeedbackSchema } from 'models/feedback.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: "User", schema: UserSchema},
    {name: "Meeting", schema: MeetingSchema},
    {name: "Note", schema: NoteSchema},
    {name: "Feedback", schema: FeedbackSchema}
  ])],
  providers: [DatabaseUtilsService],
  exports: [DatabaseUtilsService]
})
export class DatabaseUtilsModule {}
