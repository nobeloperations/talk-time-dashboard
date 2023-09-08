import { FeedbacksService } from './feedbacks.service';
import { Request, Response } from 'express';
import { CreateFeedbackBody, CreateNewFeedbackParams, FeedbackImage, GetNewFeedbackParams, GetPersonalFeedbacksParams } from 'types/types';
export declare class FeedbacksController {
    private feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    getPersonalFeedbacks(params: GetPersonalFeedbacksParams, res: Response, generalName: string, req: Request): Promise<void | import("types/types").GetPersonalFeedbacksReturn>;
    getNewFeedback(params: GetNewFeedbackParams, res: Response, generalName: string, req: Request): Promise<void | import("types/types").GetNewFeedbackReturn>;
    createFeedback(files: FeedbackImage[], createFeedbackBody: CreateFeedbackBody, params: CreateNewFeedbackParams, res: Response, req: Request): Promise<void | string>;
}
