import { ContactsService } from './contacts.service';
export declare class ContactsController {
    private contactsService;
    constructor(contactsService: ContactsService);
    getContacts(): {
        cssFileName: string;
    };
}
