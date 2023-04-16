import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.model';
import { MeetingSchema } from 'models/meeting.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Meeting', schema: MeetingSchema}])],
  providers: [BadgesService],
  controllers: [BadgesController]
})
export class BadgesModule {}
