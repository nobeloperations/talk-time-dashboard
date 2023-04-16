import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticService {
    getFAQ() {
        return { cssFileName: 'faq' }
    }

    getContacts() {
        return { cssFileName: 'contacts' }
    }
}
