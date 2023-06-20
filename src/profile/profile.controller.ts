import { Controller, Get, HttpCode, Param, Query, Render, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Response } from 'express';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Get('/:name')
    @HttpCode(200)
    @Render('profile')
    getProfile(@Param() params, @Res() res: Response, @Query('q') generalName) {
        return this.profileService.getProfile(params, res, generalName)
    }
}
