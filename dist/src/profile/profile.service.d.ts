import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class ProfileService {
    private readonly userModel;
    private readonly feedbackModel;
    private readonly meetingModel;
    constructor(userModel: Model<User>, feedbackModel: Model<Feedback>, meetingModel: Model<Meeting>);
    getProfile(params: any, res: any): Promise<Error | {
        cssFileName: string;
        name: string;
        avatar: string;
        avgRating: any;
        meetingsCounter: number;
        feedbacksReceived: (import("mongoose").Document<unknown, any, Feedback> & Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        feedbacksSent: (import("mongoose").Document<unknown, any, Feedback> & Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        meetings: any[];
        usersBadges: {
            [x: string]: unknown;
        }[];
    }>;
}
