import { FeedbacksService } from './feedbacks.service';
import { Response } from 'express';
export declare class FeedbacksController {
    private feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    getFeedbacks(params: any, res: Response): Promise<{
        cssFileName: string;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
        date: any;
        generalName: any;
    }>;
    getPersonalFeedbacks(params: any, res: Response): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        feedbacks: (import("mongoose").Document<unknown, any, import("../../models/feedback.model").Feedback> & import("../../models/feedback.model").Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
        date: any;
        generalName: any;
    }>;
    getNewFeedback(params: any, res: Response): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        url: any;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        date: any;
        generalName: any;
    }>;
    createFeedback(files: any, createFeedbackBodyDto: any, params: any, res: Response): Promise<string>;
}
