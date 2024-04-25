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
    updateQuizResults(params: any): Promise<void>;
    getQuizesResults(params: any): Promise<boolean[]>;
    getFinishQuiz(params: any, generalName: string): Promise<{
        title: string;
        text: string;
        url: any;
        date: any;
        generalName: any;
    }>;
}
