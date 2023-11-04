import { Response, Request } from 'express';
import { MessageService } from './messages.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    sendMessages(req: Request, res: Response): void;
    streamMessages(res: Response): Promise<void>;
}
