import { Controller, Get, HttpCode, Render, Post, Body, Param, Res, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get('/signin')
    @HttpCode(200)
    @Render('signin')
    getSignin() {
        return this.authService.getSignin()
    }

    @Get('/signup')
    @HttpCode(200)
    @Render('signup')
    getSignup() {
        return this.authService.getSignup()
    }

    @Post('signup')
  async register(@Body() body: any): Promise<{ message: string; user: any }> {
    return this.authService.signup(body)
  }

  
  @Post('signin')
  async login(@Body() body: any): Promise<any> {
    return this.authService.login(body);
  }

  @Get('reset/:id')
  @HttpCode(200)
  @Render('reset')
  getReset(@Param() params, @Res() res: Response) {
    return this.authService.getReset(params, res)
  }

  @Post('/reset/create')
  @HttpCode(200)
  createResetId(@Body() id: string) {
    return this.authService.createResetId(id)
  }

  @Patch('/reset/:id')
  @HttpCode(200)
  resetPassword(@Param() params, @Body() body) {
    return this.authService.resetPassword(params, body)
  }

  @Post('/mail/send')
  @HttpCode(200)
  sendEmail(@Body() body) {
    return this.authService.sendEmail(body)
  }
}
