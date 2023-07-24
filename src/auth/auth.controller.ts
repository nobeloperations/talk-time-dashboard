import { Controller, Get, UseGuards, Req, Res, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express'

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @Render('redirect')
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    return this.authService.googleLogin(req, res)
  }

  @Get('auth/logout')
  logout(@Res() res) {
    this.authService.logOut(res)
  }
}
