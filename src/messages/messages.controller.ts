import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { DeleteMessageDto } from './dtos/deleete-message.dto';

@Controller('messages')
export class MessagesController {
    constructor(private messageService: MessagesService){}

    @Get()
    @HttpCode(200)
    getMessages() {
        return this.messageService.getMessages()
    }

    @Post()
    @HttpCode(200)
    createMessage(@Body() createMessageBodyDto: CreateMessageDto) {
        return this.messageService.createMessage(createMessageBodyDto)
    }

    @Delete()
    @HttpCode(200)
    deleteMessage(@Body() deleteMessageBodyDto: DeleteMessageDto) {
        return this.messageService.deleteMessage(deleteMessageBodyDto)
    }
}
