import { Meeting } from '../../models/meeting.model';
import { Model } from 'mongoose';
import { User } from 'models/user.model';
export declare class MainService {
    private readonly meetingModel;
    private readonly userModel;
    constructor(meetingModel: Model<Meeting>, userModel: Model<User>);
    getMain(req: any): Promise<{
        cssFileName: string;
        generals: {
            name: string;
            meetings: any;
        }[];
        profileName: any;
        message?: undefined;
    } | {
        message: string;
        cssFileName?: undefined;
        generals?: undefined;
        profileName?: undefined;
    }>;
    addMeeting(addGeneralBody: any): Promise<string>;
    getFAQ(): {
        cssFileName: string;
    };
}
