import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.model';
import { NoteSchema } from '../../models/note.model';
import { FeedbackSchema } from '../../models/feedback.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'User', schema: UserSchema},
    {name: 'Note', schema: NoteSchema},
    {name: 'Feedback', schema: FeedbackSchema},
  ])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
