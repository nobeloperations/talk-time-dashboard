import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('messages')
export class ChatController {
  @Post()
  sendMessage(@Req() req: Request) {
    const message = req.body.message;
    const emitter = req.app.get('eventEmitter');
    emitter.emit('message', message);
  }

  @Get()
  streamMessages(@Req() req: Request, @Res() res: Response) {
    const emitter = req.app.get('eventEmitter');
    // Налаштування заголовків SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    const handleNewMessage = (message: string) => {
      res.write(`data: ${message}\n\n`);
    };

    emitter.on('message', handleNewMessage);

    req.on('close', () => {
      emitter.off('message', handleNewMessage);
    });
  }
}