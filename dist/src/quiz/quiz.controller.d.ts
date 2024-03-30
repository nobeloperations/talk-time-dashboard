import { QuizService } from './quiz.service';
import { Request, Response } from 'express';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    getQuiz(params: any, req: Request, res: Response): Promise<void | {
        url: any;
        date: any;
        cssFileName: string;
        isAuth: boolean;
        profileName: string;
        title: string;
    }>;
}
