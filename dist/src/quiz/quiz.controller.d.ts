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
        isPassed: any;
    }>;
    getQuizResults(params: any, result: string, generalName: string, username: string): Promise<{
        url: any;
        date: any;
        text: string;
        title: string;
        generalName: string;
    }>;
    getQuizResultsByName(params: any): Promise<string>;
}
