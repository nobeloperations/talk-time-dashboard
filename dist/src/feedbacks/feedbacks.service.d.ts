import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
export declare class FeedbacksService {
    private readonly feedbackModel;
    private readonly userModel;
    constructor(feedbackModel: Model<Feedback>, userModel: Model<User>);
    getFeedbacks(params: any, res: any): Promise<{
        cssFileName: string;
        users: (import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
        date: any;
        generalName: any;
    }>;
    getPersonalFeedbacks(params: any, res: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        };
        feedbacks: (import("mongoose").Document<unknown, any, Feedback> & Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
        date: any;
        generalName: any;
    }>;
    getNewFeedback(params: any, res: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        };
        url: any;
        users: (import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        date: any;
        generalName: any;
    }>;
    createFeedback(files: any, createFeedbackBodyDto: any, params: any, res: any): Promise<string>;
}
