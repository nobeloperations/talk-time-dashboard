import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
export declare class FeedbacksService {
    private readonly feedbackModel;
    private readonly userModel;
    constructor(feedbackModel: Model<Feedback>, userModel: Model<User>);
    getPersonalFeedbacks(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        feedbacks: (import("mongoose").Document<unknown, any, Feedback> & Omit<Feedback & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        url: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    getNewFeedback(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        url: any;
        users: (import("mongoose").Document<unknown, any, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    createFeedback(files: any, createFeedbackBody: any, params: any, res: any, req: any): Promise<string>;
}
