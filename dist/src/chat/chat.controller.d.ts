import { Request, Response } from 'express';
export declare class ChatController {
    sendMessage(req: Request): void;
    streamMessages(req: Request, res: Response): void;
}
