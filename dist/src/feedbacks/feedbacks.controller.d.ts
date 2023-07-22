import { FeedbacksService } from './feedbacks.service';
import { Request, Response } from 'express';
export declare class FeedbacksController {
    private feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    getPersonalFeedbacks(params: Object, res: Response, generalName: string, req: Request): Promise<{
        cssFileName: string;
        name: any;
        currentUser: any;
        feedbacks: any;
        url: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    getNewFeedback(params: Object, res: Response, generalName: string, req: Request): Promise<{
        cssFileName: string;
        name: any;
        currentUser: any;
        url: any;
        users: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    createFeedback(files: Object[], createFeedbackBody: Object, params: Object, res: Response, req: Request): Promise<string>;
}
