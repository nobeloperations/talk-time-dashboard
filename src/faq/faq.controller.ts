import { Controller, Get, HttpCode, Render } from '@nestjs/common';
import { FaqService } from './faq.service';

@Controller('faq')
export class FaqController {
    constructor(private faqService: FaqService){}

    @Get('')
    @Render('faq')
    @HttpCode(200)
    getFAQ() {
        return this.faqService.getFAQ()
    }
}
