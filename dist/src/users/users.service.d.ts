import { Badge } from 'models/badges.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userModel;
    private readonly badgeModel;
    constructor(userModel: Model<User>, badgeModel: Model<Badge>);
    newUser(params: any, newUserBodyDto: any, headers: any): Promise<void>;
    getUsers(params: any): Promise<{
        cssFileName: string;
        users: any[];
        url: any;
        date: any;
    }>;
    updateStatus(updateStatusBodyDto: any): Promise<void>;
    getStatuses(params: any): Promise<string>;
}
