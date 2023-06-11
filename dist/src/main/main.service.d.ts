import { Meeting } from '../../models/meeting.model';
import { Model } from 'mongoose';
import { User } from 'models/user.model';
export declare class MainService {
    private readonly meetingModel;
    private readonly userModel;
    constructor(meetingModel: Model<Meeting>, userModel: Model<User>);
    getWelcome(): {
        cssFileName: string;
    };
    getMain(): Promise<string | {
        cssFileName: string;
        meetings: (import("mongoose").Document<unknown, any, Meeting> & Meeting & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getSearchlist(params: any, res: any): Promise<{
        meetingsResult: (import("mongoose").Document<unknown, any, Meeting> & Meeting & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        cssFileName: string;
    }>;
    addMeeting(addGeneralBodyDto: any): Promise<string>;
}
