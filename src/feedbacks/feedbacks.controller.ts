import { Controller, Get, HttpCode, Param, Post, Render, Body, UseInterceptors, UploadedFiles, Res, Query, Req } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

@Controller('feedbacks')
export class FeedbacksController {

    constructor(private feedbacksService: FeedbacksService){}

    @Get('/:url/:name/:date')
    @Render('personal-feedbacks')
    @HttpCode(200)
    getPersonalFeedbacks(@Param() params: Object, @Res() res: Response, @Query('q') generalName: string, @Req() req: Request) {
        return this.feedbacksService.getPersonalFeedbacks(params, res, generalName, req)
    }

    @Get('/create/:url/:receiver/:date')
    @Render('new-feedback')
    @HttpCode(200)
    getNewFeedback(@Param() params: Object, @Res() res: Response, @Query('q') generalName: string, @Req() req: Request) {
        return this.feedbacksService.getNewFeedback(params, res, generalName, req)
    }

    @Post('/create/:generalName/:url/:receiver/:date')
    @HttpCode(200)
    @UseInterceptors(
        FilesInterceptor('file', 20, {
          storage: diskStorage({
            destination: './uploads',
            filename: function (_, file, done) {
              done(null, Date.now() + extname(file.originalname));
          }
          }),
        }),
      )
      createFeedback(@UploadedFiles() files: Object[], @Body() createFeedbackBody: Object, @Param() params: Object, @Res() res: Response, @Req() req: Request) {
        return this.feedbacksService.createFeedback(files, createFeedbackBody, params, res, req)
      }
}
