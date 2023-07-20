import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingSchema } from 'models/meeting.model';
import { UserSchema } from 'models/user.model';
import { AuthSchema } from 'models/auth.model';
import { ResetSchema } from 'models/reset.model';
const { JWT_SECRET } = process.env;

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Meeting', schema: MeetingSchema}, {name: "User", schema: UserSchema}, {name: "Auth", schema: AuthSchema}, {name: 'Reset', schema: ResetSchema}]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
