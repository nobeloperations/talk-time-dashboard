import { Controller, Get, Post, Render, Body, HttpCode, Req, Res, Param, Query } from '@nestjs/common';
import { MainService } from './main.service';
import { Request, Response } from 'express';
import { AddGeneralBody, MainReturn } from 'types/types';

@Controller('')
export class MainController {

    constructor(private mainService: MainService){}

    @Get('/')
    @Render('main')
    @HttpCode(200)
    getMain(@Req() req: Request, @Res() res: Response): Promise<MainReturn | string | { cssFileName: string, isAuth: boolean} | void> {
        return this.mainService.getMain(req, res)
    }

    @Post('/main/addmeeting')
    @HttpCode(200)
    addGeneral(@Body() addGeneralBody: AddGeneralBody): Promise<void | string> {
        return this.mainService.addMeeting(addGeneralBody)
    }

    @Get('/faq')
    @Render('faq')
    @HttpCode(200)
    getFAQ(@Req() req: Request) {
        return this.mainService.getFAQ(req)
    }

    @Get('/currentversion')
    @HttpCode(200)
    getCurrentVersion(): {version: string} {
        return {
            version: '3.16'
        }
    }

    @Get("/policy")
    @HttpCode(200)
    @Render("policy")
    getPolicy() {}


    @Get('/checkevent/:code')
    @HttpCode(200)
    validateGoogleMeetLink(@Req() req: Request) {
        return this.mainService.validateGoogleMeetLink(req)
    }

    @Get('/hall-of-fame/:url/:date')
    @HttpCode(200)
    @Render('hall-of-fame')
    getHallOfFame(@Req() req: Request, @Res() res: Response, @Query('q') generalName: string) {
        return this.mainService.getHallOfFame(req, res, generalName)
    }

    @Get('/meeting/start-time/:url/:date')
    @HttpCode(200)
    getMeetingStartTime(@Req() req: Request, @Res() res: Response, @Query('q') generalName: string) {
        return this.mainService.getMeetingStartTime(req, res, generalName)
    }

}
