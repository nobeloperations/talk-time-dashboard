import { Controller, Get, Post, Render, HttpCode, Param, Res, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Response } from 'express';
import { CommentsParamsDto } from './dtos/comments.dto';
import { NewCommentBodyDto } from './dtos/new-comment.dto';

@Controller('comments')
export class CommentsController {    
    constructor(private commentsService: CommentsService){}

    @Get('/:url/:id')
    @Render('comments')
    @HttpCode(200)
    getComments(@Param() params: CommentsParamsDto) {        
      return this.commentsService.getComments(params)
    }

    @Post('/create/:url/:id')
    @HttpCode(200)
    newComment(@Param() params: CommentsParamsDto, @Body() newCommentBodyDto: NewCommentBodyDto, @Res() res: Response) {
      return this.commentsService.newComment(params, newCommentBodyDto, res)
    }
}
