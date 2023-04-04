import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.model';
import { ConclusionSchema } from '../../models/conclusion.model';
import { FeedbackSchema } from '../../models/feedback.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'User', schema: UserSchema},
    {name: 'Conclusion', schema: ConclusionSchema},
    {name: 'Feedback', schema: FeedbackSchema},
  ])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
