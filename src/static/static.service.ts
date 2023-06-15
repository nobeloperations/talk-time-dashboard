import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticService {
    getFAQ() {
        return { cssFileName: 'faq' }
    }
}
