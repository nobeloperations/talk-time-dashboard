import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsService {
    getContacts() {
        return { cssFileName: 'contacts' }
    }
}
