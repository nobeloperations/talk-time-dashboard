import { Injectable } from '@nestjs/common';
import EventEmitter from 'events';

@Injectable()
export class ChatService {

    private eventEmitter: EventEmitter

    sendMessages(req) {
        const { name, message, to, url } = req.body;

        this.eventEmitter.emit('message', JSON.stringify({ url, name, message, to }));
    }

    streamMessages(res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        // Функція-обробник, яка буде викликана під час події 'message'
        const handleNewMessage = (message) => {
            res.write(`data: ${message}\n\n`);
        };

        // Додавання функції-обробника до події 'message'
        this.eventEmitter.on('message', handleNewMessage);

        // Видалення функції-обробника після закриття з'єднання
        res.on('close', () => {
            this.eventEmitter.off('message', handleNewMessage);
        });
    }
}
