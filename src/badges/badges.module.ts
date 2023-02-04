import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [BadgesService],
  controllers: [BadgesController]
})
export class BadgesModule {}
