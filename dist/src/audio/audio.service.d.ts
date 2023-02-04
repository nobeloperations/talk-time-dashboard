import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class AudioService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getAudioActivity(params: any): Promise<{
        users: (import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
        cssFileName: string;
    }>;
    postPeaks(params: any, postPeaksBodyDto: any): Promise<void>;
    getVad(params: any): {
        cssFileName: string;
        name: any;
        url: any;
    };
}
