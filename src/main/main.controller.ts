import { Controller, Get, Post, Render, Body, HttpCode, Req, Res } from '@nestjs/common';
import { MainService } from './main.service';
import { Request } from 'express';

@Controller('')
export class MainController {

    constructor(private mainService: MainService){}

    @Get('/')
    @Render('main')
    @HttpCode(200)
    getMain(@Req() req: Request, @Res() res) {
        return this.mainService.getMain(req, res)
    }

    @Post('/main/addmeeting')
    @HttpCode(200)
    addGeneral(@Body() addGeneralBody: Object) {
        return this.mainService.addMeeting(addGeneralBody)
    }

    @Get('/faq')
    @Render('faq')
    @HttpCode(200)
    getFAQ() {
        return this.mainService.getFAQ()
    }
}
