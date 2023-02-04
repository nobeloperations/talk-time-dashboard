import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneralSchema } from 'models/general.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'General', schema: GeneralSchema}])],
  providers: [InformationService],
  controllers: [InformationController]
})
export class StaticPagesModule {}
