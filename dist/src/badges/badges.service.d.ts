import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class BadgesService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    newBadge(params: any, newBadgeBodyDto: any): Promise<void>;
    getFeedbackBadges(params: any): Promise<{
        cssFileName: string;
        badges: {};
        currentUser: import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        };
        url: any;
        name: any;
    }>;
}
