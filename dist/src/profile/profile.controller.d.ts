import { ProfileService } from './profile.service';
import { Response } from 'express';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile(params: Object, res: Response, generalName: String): Promise<Error | {
        cssFileName: string;
        name: string;
        avatar: string;
        avgRating: number;
        meetingsCounter: number;
        feedbacksReceived: (import("mongoose").Document<unknown, any, import("../../models/feedback.model").Feedback> & import("../../models/feedback.model").Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        feedbacksSent: (import("mongoose").Document<unknown, any, import("../../models/feedback.model").Feedback> & import("../../models/feedback.model").Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        meetings: any[];
        usersBadges: {};
        generalName: any;
    }>;
}
