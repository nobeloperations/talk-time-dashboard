import { Controller, Get, HttpCode, Param, Post, Render, Body, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { UrlDto } from 'global.dto';
import { PersonalFeedbacksDto } from './dtos/personal-feedbacks.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { GetNewFeedbackParamDto, createFeedbackBodyDto } from 'src/feedbacks/dtos/new-feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {

    constructor(private feedbacksService: FeedbacksService){}

    @Get('/:url/:date')
    @Render('feedbacks')
    @HttpCode(200)
    getFeedbacks(@Param() params: UrlDto) {
        return this.feedbacksService.getFeedbacks(params)
    }

    @Get('/:url/:name/:date')
    @Render('personal-feedbacks')
    @HttpCode(200)
    getPersonalFeedbacks(@Param() params: PersonalFeedbacksDto) {
        return this.feedbacksService.getPersonalFeedbacks(params)
    }

    @Get('/create/:url/:name/:date')
    @Render('new-feedback')
    @HttpCode(200)
    getNewFeedback(@Param() params: GetNewFeedbackParamDto) {
        return this.feedbacksService.getNewFeedback(params)
    }

    @Post('/create/:url/:name/:date')
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
      createFeedback(@UploadedFiles() files, @Body() createFeedbackBodyDto: createFeedbackBodyDto, @Param() params: GetNewFeedbackParamDto, @Res() res: Response) {
        return this.feedbacksService.createFeedback(files, createFeedbackBodyDto, params, res)
      }
}
