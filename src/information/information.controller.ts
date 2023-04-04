import { Controller, Get, Render, HttpCode, Param } from '@nestjs/common';
import { InformationService } from './information.service';

@Controller('information')
export class InformationController {
    constructor(private informationService: InformationService) {}

    @Get('/:url/:date')
    @Render('information')
    @HttpCode(200)
    getBadges(@Param() params) {
        return this.informationService.getInformation(params)
    }
}
