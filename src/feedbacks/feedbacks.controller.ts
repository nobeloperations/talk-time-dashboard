import { Controller, Get, HttpCode, Param, Post, Render, Body, UseInterceptors, UploadedFiles, Res, Query, Req } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { CreateFeedbackBody, CreateNewFeedbackParams, FeedbackImage, GetNewFeedbackParams, GetPersonalFeedbacksParams } from 'types/types';

@Controller('feedbacks')
export class FeedbacksController {

    constructor(private feedbacksService: FeedbacksService){}

    @Get('/:url/:name/:date')
    @Render('personal-feedbacks')
    @HttpCode(200)
    getPersonalFeedbacks(@Param() params: GetPersonalFeedbacksParams, @Res() res: Response, @Query('q') generalName: string, @Req() req: Request) {
        return this.feedbacksService.getPersonalFeedbacks(params, res, generalName, req)
    }

    @Get('/create/:url/:receiver/:date')
    @Render('new-feedback')
    @HttpCode(200)
    getNewFeedback(@Param() params: GetNewFeedbackParams, @Res() res: Response, @Query('q') generalName: string, @Req() req: Request) {
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
      createFeedback(@UploadedFiles() files: FeedbackImage[], @Body() createFeedbackBody: CreateFeedbackBody, @Param() params: CreateNewFeedbackParams, @Res() res: Response, @Req() req: Request): Promise<void | string> {
        return this.feedbacksService.createFeedback(files, createFeedbackBody, params, res, req)
      }
}
