import { Module } from '@nestjs/common';
import { MainModule } from './main/main.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { MulterModule } from '@nestjs/platform-express';
import { StaticPagesModule } from './information/information.module';
import { AudioModule } from './audio/audio.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { BadgesModule } from './badges/badges.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}), 
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MulterModule.register({
      dest: '../public/uploads'
    }),
    MainModule,
    DashboardModule,
    FeedbacksModule,
    StaticPagesModule,
    AudioModule,
    CommentsModule,
    UsersModule,
    BadgesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
