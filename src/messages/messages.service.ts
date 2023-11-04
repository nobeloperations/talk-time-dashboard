import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class MessageService {
    private eventEmitter = new EventEmitter();

    sendMessage(message: any): void {
        this.eventEmitter.emit('message', JSON.stringify(message));
    }

    onMessage(callback: (message: string) => void): void {
        this.eventEmitter.on('message', callback);
    }

    offMessage(callback: (message: string) => void): void {
        this.eventEmitter.off('message', callback);
    }
}