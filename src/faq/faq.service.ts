import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqService {
    getFAQ() {
        return { cssFileName: 'faq' }
    }
}
