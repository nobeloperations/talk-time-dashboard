import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'models/message.model';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>){}

    async getMessages() {
        const messages = await this.messageModel.find({})
        return JSON.stringify(messages)
    }

    async createMessage(createMessageBodyDto) {
        const { text, from, to, url } = createMessageBodyDto;
        const newMessage = new this.messageModel({
            text,
            from,
            to, 
            url
        })

        await newMessage.save()
    }

    async deleteMessage(deleteMessageBodyDto) {
        const { name, url } = deleteMessageBodyDto;
        await this.messageModel.deleteMany({ to: name, url })
    }
}
