import { FeedbacksService } from './feedbacks.service';
import { Request, Response } from 'express';
export declare class FeedbacksController {
    private feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    getPersonalFeedbacks(params: Object, res: Response, generalName: string, req: Request): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & Omit<import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        feedbacks: (import("mongoose").Document<unknown, any, import("../../models/feedback.model").Feedback> & Omit<import("../../models/feedback.model").Feedback & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        url: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    getNewFeedback(params: Object, res: Response, generalName: string, req: Request): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & Omit<import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        url: any;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & Omit<import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    createFeedback(files: Object[], createFeedbackBody: Object, params: Object, res: Response, req: Request): Promise<string>;
}
