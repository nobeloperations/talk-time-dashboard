import { Controller, Get, HttpCode, Param, Query, Render, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Response } from 'express';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Get('/:name')
    @HttpCode(200)
    @Render('profile')
    getProfile(@Param() params: Object, @Res() res: Response, @Query('q') generalName: string) {
        return this.profileService.getProfile(params, res, generalName)
    }
}
