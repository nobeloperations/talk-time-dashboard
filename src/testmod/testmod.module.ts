import { Module } from '@nestjs/common';
import { TestmodService } from './testmod.service';
import { TestmodController } from './testmod.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'models/user.model';
import { MeetingSchema } from 'models/meeting.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Meeting', schema: MeetingSchema}])],
  providers: [TestmodService],
  controllers: [TestmodController]
})
export class TestmodModule {}
