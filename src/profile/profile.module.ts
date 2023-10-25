import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [DatabaseUtilsModule]
})
export class ProfileModule {}
