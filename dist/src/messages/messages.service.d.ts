import { Message } from 'models/message.model';
import { Model } from 'mongoose';
export declare class MessagesService {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    getMessages(): Promise<string>;
    createMessage(createMessageBodyDto: any): Promise<void>;
    deleteMessage(deleteMessageBodyDto: any): Promise<void>;
}
