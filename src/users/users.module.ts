import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.model';
import { MeetingSchema } from 'models/meeting.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Meeting', schema: MeetingSchema}])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
