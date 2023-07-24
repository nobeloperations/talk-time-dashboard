import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseUtilsModule } from 'src/database-utils/database-utils.module';
import { GoogleStrategy } from 'auth-stategy/passport.stategy';

@Module({
  imports: [
    DatabaseUtilsModule,
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
