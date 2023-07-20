import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MainModule } from './main/main.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { BadgesModule } from './badges/badges.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ProfileModule } from './profile/profile.module';
import { RecordingModule } from './recording/recording.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from 'nestjs-session';
import * as cookieParser from 'cookie-parser'


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MulterModule.register({
      dest: '../public/uploads'
    }),
    SessionModule.forRoot({
      session: {
        secret: 'Bearer580792',
        resave: false,
        saveUninitialized: false,
      },
    }),
    MainModule,
    DashboardModule,
    FeedbacksModule,
    UsersModule,
    BadgesModule,
    ProfileModule,
    RecordingModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
  ],
})
export class AppModule {
}
