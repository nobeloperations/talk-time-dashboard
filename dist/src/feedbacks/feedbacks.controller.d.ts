import { FeedbacksService } from './feedbacks.service';
import { Request, Response } from 'express';
export declare class FeedbacksController {
    private feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    getPersonalFeedbacks(params: Object, res: Response, generalName: string, req: Request): Promise<any>;
    getNewFeedback(params: Object, res: Response, generalName: string, req: Request): Promise<any>;
    createFeedback(files: Object[], createFeedbackBody: Object, params: Object, res: Response, req: Request): Promise<any>;
}
