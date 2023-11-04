import { Controller, Post, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { MessageService } from './messages.service';

@Controller()
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post('send-messages')
    sendMessages(@Req() req: Request, @Res() res: Response) {
        this.messageService.sendMessage(req.body);
        res.status(200).send('HEY');
    }


    @Get('stream-messages')
    async streamMessages(@Res() res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Cache-Control', 'no-cache');

        const handleNewMessage = (message) => {
            res.write(`data: ${message}\n\n`);
            console.log(message)
        };
        

        this.messageService.onMessage(handleNewMessage);

        res.on('close', () => {
            this.messageService.offMessage(handleNewMessage);
        });
    }
}