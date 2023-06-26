import { Controller, Get, Post, Render, Body, HttpCode } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('')
export class MainController {

    constructor(private mainService: MainService){}

    @Get('/')
    @Render('main')
    @HttpCode(200)
    getMain() {
        return this.mainService.getMain()
    }

    @Post('/main/addmeeting')
    @HttpCode(200)
    addGeneral(@Body() addGeneralBody) {
        return this.mainService.addMeeting(addGeneralBody)
    }

    @Get('/faq')
    @Render('faq')
    @HttpCode(200)
    getFAQ() {
        return this.mainService.getFAQ()
    }
}
