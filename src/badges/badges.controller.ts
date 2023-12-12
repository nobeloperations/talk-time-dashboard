import { Controller, Post, Param, HttpCode, Body, Get } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { NewBadgeBody, NewBadgeParams } from 'types/types';

@Controller('badges')
export class BadgesController {

    constructor(private badgesService: BadgesService){}

    @Post('/givebadge/:url/:name/:date')
    @HttpCode(200)
    newBadge(@Param() params: NewBadgeParams, @Body() newBadgeBody: NewBadgeBody): Promise<void | string> {
        return this.badgesService.newBadge(params, newBadgeBody)
    }

    @Get("/:name")
    @HttpCode(200)
    calculateBadgesLevel(@Param() params) {
        return this.badgesService.calculateBadgeLevel(params)
    }
}
