import { Controller, Get, Post, Render, Body, HttpCode, Param, Res } from '@nestjs/common';
import { MainService } from './main.service';
import { Response } from 'express';

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
    getSearchlist(@Param() params, @Res() res: Response) {
        return this.mainService.getSearchlist(params, res)
    }

    @Post('/main/addmeeting')
    @HttpCode(200)
    addGeneral(@Body() addGeneralBodyDto) {
        return this.mainService.addMeeting(addGeneralBodyDto)
    }

    @Get('/users/:url/') 
    @HttpCode(200)
    getUsersByUrAndDate(@Param() params) {
        return this.mainService.getUsersByUrl(params)
    }
}
