import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.model';
import { MeetingSchema } from 'models/meeting.model';
import { AuthSchema } from 'models/auth.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Meeting', schema: MeetingSchema}, {name: "Auth", schema: AuthSchema}])],
  providers: [UserService],
  controllers: [UsersController]
})
export class UsersModule {}
