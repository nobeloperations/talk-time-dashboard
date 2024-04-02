import { Controller, Get, HttpCode, Param, Query, Render, Req } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Request, Response } from 'express';


@Controller('quiz')
export class QuizController {
    
    constructor(private readonly quizService: QuizService) {}

    @Get('/:url/:date')
    @Render('quiz')
    @HttpCode(200)
    getQuiz(@Param() params, @Req() req: Request, res: Response) {
        return this.quizService.getQuiz(params, req, res)
    }

    @Get('/results/:url/:date')
    @HttpCode(200)
    @Render('quiz-results')
    getQuizResults(@Param() params, @Query('result') result: string, @Query('q') generalName: string, @Query('name') username: string) {
        return this.quizService.getQuizResultsPage(params, result, generalName, username)
    }

    @Get('/get/results/:name')
    @HttpCode(200)
    getQuizResultsByName(@Param() params) {
        return this.quizService.getQuizResultsByName(params)
    }
    
}
