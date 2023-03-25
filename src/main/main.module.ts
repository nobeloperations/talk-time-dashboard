import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { MeetingSchema } from '../../models/meeting.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Meeting', schema: MeetingSchema}])],
  providers: [MainService],
  controllers: [MainController]
})
export class MainModule {}
