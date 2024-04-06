import { Request, Response } from 'express';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class QuizService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getQuiz(params: any, req: Request, res: Response): Promise<void | {
        url: any;
        date: any;
        cssFileName: string;
        isAuth: boolean;
        profileName: string;
        title: string;
        isPassed: any;
    }>;
    getQuizResultsPage(params: any, result: string, generalName: string, username: string): Promise<{
        url: any;
        date: any;
        text: string;
        title: string;
        generalName: string;
    }>;
    getQuizResultsByName(params: any): Promise<string>;
}
