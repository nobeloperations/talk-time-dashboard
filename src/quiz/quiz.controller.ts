import { Controller, Get, HttpCode, Param, Render, Req } from '@nestjs/common';
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
    
}
