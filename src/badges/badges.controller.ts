import { Controller, Post, Param, HttpCode, Body, Render, Get, Res } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { Response } from 'express';

@Controller('badges')
export class BadgesController {

    constructor(private badgesService: BadgesService){}

    @Post('/givebadge/:url/:name/:date')
    @HttpCode(200)
    newBadge(@Param() params, @Body() newBadgeBodyDto) {
        return this.badgesService.newBadge(params, newBadgeBodyDto)
    }

    @Get('/:url/:name/:date')
    @Render('feedback-badges')
    @HttpCode(200)
    getFeedbackBadges(@Param() params, @Res() res: Response) {
        return this.badgesService.getFeedbackBadges(params, res)
    }
}
