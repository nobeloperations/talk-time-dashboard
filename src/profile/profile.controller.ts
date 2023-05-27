import { Controller, Get, HttpCode, Param, Render, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Response } from 'express';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Get('/:name')
    @HttpCode(200)
    @Render('profile')
    getProfile(@Param() params, @Res() res: Response) {
        return this.profileService.getProfile(params, res)
    }
}
