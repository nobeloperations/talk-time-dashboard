import { Feedback } from 'models/feedback.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class CommentsService {
    private readonly feedbackModel;
    private readonly userModel;
    constructor(feedbackModel: Model<Feedback>, userModel: Model<User>);
    getComments(params: any): Promise<{
        cssFileName: string;
        url: any;
        users: (import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        feedback: import("mongoose").Document<unknown, any, Feedback> & Feedback & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    newComment(params: any, newCommentBodyDto: any, res: any): Promise<void>;
}
