import { User } from '../../models/user.model';
import { Model } from 'mongoose';
export declare class BadgesService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    newBadge(params: any, newBadgeBody: any): Promise<string>;
}
