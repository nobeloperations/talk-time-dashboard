import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [AudioController],
  providers: [AudioService]
})
export class AudioModule {}
