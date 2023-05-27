import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { Meeting } from 'models/meeting.model';
export declare class BadgesService {
    private readonly userModel;
    private readonly meetingModel;
    constructor(userModel: Model<User>, meetingModel: Model<Meeting>);
    newBadge(params: any, newBadgeBodyDto: any): Promise<string>;
}
