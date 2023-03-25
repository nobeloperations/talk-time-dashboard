import { Controller, Post, Param, HttpCode, Body, Render, Get } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { NewBadgeBodyDto, NewBadgeParamDto } from './dtos/new-badge.dto';
import { FeedbackBadgesDto } from './dtos/feedback-badges.dto';

@Controller('badges')
export class BadgesController {

    constructor(private badgesService: BadgesService){}

    @Post('/givebadge/:url/:name/:date')
    @HttpCode(200)
    newBadge(@Param() params: NewBadgeParamDto, @Body() newBadgeBodyDto: NewBadgeBodyDto) {
        return this.badgesService.newBadge(params, newBadgeBodyDto)
    }

    @Get('/:url/:name/:date')
    @Render('feedback-badges')
    @HttpCode(200)
    getFeedbackBadges(@Param() params: FeedbackBadgesDto) {
        return this.badgesService.getFeedbackBadges(params)
    }
}
