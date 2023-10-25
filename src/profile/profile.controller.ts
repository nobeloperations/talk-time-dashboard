import { Controller, Get, HttpCode, Param, Query, Render, Req, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request, Response } from 'express';
import { GetProfileParams } from 'types/types';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) {}

    @Get('')
    @HttpCode(200)
    @Render('profile')
    async getProfile(@Req() req: Request, @Res() res: Response, @Param() params: GetProfileParams, @Query('q') generalName: string) {
        return this.profileService.getProfile(req, res, params, generalName)
    }
}
