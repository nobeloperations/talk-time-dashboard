import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class AudioService {
    private readonly meetingModel;
    private readonly userModel;
    constructor(meetingModel: Model<Meeting>, userModel: Model<User>);
    postPeaks(params: any, postPeaksBodyDto: any): Promise<void>;
    getVad(params: any): {
        cssFileName: string;
        name: any;
        url: any;
        date: any;
    };
}
