import { Controller, Get, Render, HttpCode, Param } from '@nestjs/common';
import { InformationService } from './information.service';
import { UrlDto } from 'global.dto';

@Controller('information')
export class InformationController {
    constructor(private informationService: InformationService) {}

    @Get('/:url/:date')
    @Render('information')
    @HttpCode(200)
    getBadges(@Param() params: UrlDto) {
        return this.informationService.getInformation(params)
    }
}
