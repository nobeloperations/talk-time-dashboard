import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { DeleteMessageDto } from './dtos/deleete-message.dto';
export declare class MessagesController {
    private messageService;
    constructor(messageService: MessagesService);
    getMessages(): Promise<string>;
    createMessage(createMessageBodyDto: CreateMessageDto): Promise<void>;
    deleteMessage(deleteMessageBodyDto: DeleteMessageDto): Promise<void>;
}
