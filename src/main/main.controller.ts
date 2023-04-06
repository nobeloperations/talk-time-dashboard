import { Controller, Get, Post, Render, Body, HttpCode, Param } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('')
export class MainController {

    constructor(private mainService: MainService){}

    @Get('')
    @Render('welcome')
    @HttpCode(200)
    getWelcome() {
        return this.mainService.getWelcome()
    }

    @Get('/main')
    @Render('main')
    @HttpCode(200)
    getMain() {
        return this.mainService.getMain()
    }

    @Get('/main/searchlist/:url')
    @Render('searchlist')
    @HttpCode(200)
    getSearchlist(@Param() params) {
        return this.mainService.getSearchlist(params)
    }

    @Post('/main/addmeeting')
    @HttpCode(200)
    addGeneral(@Body() addGeneralBodyDto) {
        return this.mainService.addMeeting(addGeneralBodyDto)
    }
}
