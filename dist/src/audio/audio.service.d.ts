import { User } from '../../models/user.model';
import { Model } from 'mongoose';
export declare class AudioService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    postPeaks(params: any, postPeaksBodyDto: any): Promise<string>;
}
