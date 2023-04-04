import { Controller, Get, Post, Render, HttpCode, Param, Res, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Response } from 'express';

@Controller('comments')
export class CommentsController {    
    constructor(private commentsService: CommentsService){}

    @Get('/:url/:id/:date')
    @Render('comments')
    @HttpCode(200)
    getComments(@Param() params) {        
      return this.commentsService.getComments(params)
    }

    @Post('/create/:url/:id')
    @HttpCode(200)
    newComment(@Param() params, @Body() newCommentBodyDto, @Res() res: Response) {
      return this.commentsService.newComment(params, newCommentBodyDto, res)
    }
}
