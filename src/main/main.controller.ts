import { Controller, Get, Post, Render, Body, HttpCode, Param } from '@nestjs/common';
import { MainService } from './main.service';
import { UrlDto } from 'global.dto';
import { AddGeneralDto } from 'src/main/dtos/add-general.dto';

@Controller('main')
export class MainController {

    constructor(private mainService: MainService){}

    @Post('/test')
    test(@Body() body) {
        return this.mainService.test(body)
    }

    @Get()
    @Render('main')
    @HttpCode(200)
    getMain() {
        return this.mainService.getMain()
    }

    @Get('/searchlist/:url')
    @Render('searchlist')
    @HttpCode(200)
    getSearchlist(@Param() params: UrlDto) {
        return this.mainService.getSearchlist(params)
    }

    @Post('/addmeeting')
    @HttpCode(200)
    addGeneral(@Body() addGeneralBodyDto: AddGeneralDto) {
        return this.mainService.addMeeting(addGeneralBodyDto)
    }
}
