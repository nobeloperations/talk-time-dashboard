import { Controller, Get, HttpCode, Render } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {

    constructor(private contactsService: ContactsService){}

    @Get('')
    @Render('contacts')
    @HttpCode(200)
    getContacts() {
        return this.contactsService.getContacts()
    }
}
