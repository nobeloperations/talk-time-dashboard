import { Controller, Post, Param, HttpCode, Body } from '@nestjs/common';
import { BadgesService } from './badges.service';

@Controller('badges')
export class BadgesController {

    constructor(private badgesService: BadgesService){}

    @Post('/givebadge/:url/:name/:date')
    @HttpCode(200)
    newBadge(@Param() params: Object, @Body() newBadgeBody: Object) {
        return this.badgesService.newBadge(params, newBadgeBody)
    }
}
