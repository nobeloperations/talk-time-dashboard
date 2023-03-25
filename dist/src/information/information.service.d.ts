import { Meeting } from 'models/meeting.model';
import { Model } from 'mongoose';
export declare class InformationService {
    private readonly meetingModel;
    constructor(meetingModel: Model<Meeting>);
    getInformation(params: any): Promise<{
        cssFileName: string;
        isMeetPresent: any[];
        url: any;
        date: any;
    }>;
}
