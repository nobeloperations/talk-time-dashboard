import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingSchema } from 'models/meeting.model';
import { UserSchema } from 'models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Meeting', schema: MeetingSchema},{name: 'User', schema: UserSchema}])],
  controllers: [AudioController],
  providers: [AudioService]
})
export class AudioModule {}
