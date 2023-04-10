import { Module } from '@nestjs/common';
import { MainModule } from './main/main.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { MulterModule } from '@nestjs/platform-express';
import { AudioModule } from './audio/audio.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { BadgesModule } from './badges/badges.module';
import { ContactsModule } from './contacts/contacts.module';
import { FaqModule } from './faq/faq.module';


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
    AudioModule,
    CommentsModule,
    UsersModule,
    BadgesModule,
    ContactsModule,
    FaqModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
