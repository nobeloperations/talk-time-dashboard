import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'models/user.model';
import { FeedbackSchema } from 'models/feedback.model';
import { MeetingSchema } from 'models/meeting.model';

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name: 'Feedback', schema: FeedbackSchema}, {name: 'Meeting', schema: MeetingSchema}])]
})
export class ProfileModule {}
