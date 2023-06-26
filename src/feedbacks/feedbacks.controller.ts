import { Controller, Get, HttpCode, Param, Post, Render, Body, UseInterceptors, UploadedFiles, Res, Query } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('feedbacks')
export class FeedbacksController {

    constructor(private feedbacksService: FeedbacksService){}

    @Get('/:url/:name/:date')
    @Render('personal-feedbacks')
    @HttpCode(200)
    getPersonalFeedbacks(@Param() params, @Res() res: Response, @Query('q') generalName) {
        return this.feedbacksService.getPersonalFeedbacks(params, res, generalName)
    }

    @Get('/create/:url/:name/:date')
    @Render('new-feedback')
    @HttpCode(200)
    getNewFeedback(@Param() params, @Res() res: Response, @Query('q') generalName) {
        return this.feedbacksService.getNewFeedback(params, res, generalName)
    }

    @Post('/create/:generalName/:url/:name/:date')
    @HttpCode(200)
    @UseInterceptors(
        FilesInterceptor('file', 20, {
          storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, done) {
              done(null, Date.now() + extname(file.originalname));
          }
          }),
        }),
      )
      createFeedback(@UploadedFiles() files, @Body() createFeedbackBody, @Param() params, @Res() res: Response) {
        return this.feedbacksService.createFeedback(files, createFeedbackBody, params, res)
      }
}
