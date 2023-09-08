import { Controller, Get, UseGuards, Req, Res, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express'

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @Render('redirect')
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.googleLogin(req)
  }

  @Get('auth/logout')
  logout(@Res() res: Response) {
    this.authService.logOut(res)
  }
}
