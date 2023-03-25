import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingSchema } from 'models/meeting.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Meeting', schema: MeetingSchema}])],
  providers: [InformationService],
  controllers: [InformationController]
})
export class StaticPagesModule {}
