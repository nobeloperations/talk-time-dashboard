import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { GeneralSchema } from '../../models/general.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'General', schema: GeneralSchema}])],
  providers: [MainService],
  controllers: [MainController]
})
export class MainModule {}
