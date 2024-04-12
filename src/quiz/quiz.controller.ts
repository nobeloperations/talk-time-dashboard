import { Controller, Get, HttpCode, Param, Put, Query, Render, Req } from '@nestjs/common';
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

    @Put('/update/results/:name/:index')
    @HttpCode(200)
    updateQuizResults(@Param() params) {
        return this.quizService.updateQuizResults(params)
    }

    @Get('/get/results/:name')
    @HttpCode(200)
    getQuizesResults(@Param() params) {
        return this.quizService.getQuizesResults(params)
    }

    @Get('/finish/:url/:date/:result')
    @HttpCode(200)
    @Render('quiz-results')
    getFinishQuiz(@Param() params) {
        return this.quizService.getFinishQuiz(params)
    }
    
}
