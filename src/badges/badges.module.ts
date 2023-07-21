import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';

@Module({
  imports: [DatabaseUtilsModule],
  providers: [BadgesService],
  controllers: [BadgesController]
})
export class BadgesModule {}
