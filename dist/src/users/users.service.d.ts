import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { Meeting } from 'models/meeting.model';
export declare class UsersService {
    private readonly userModel;
    private readonly meetingModel;
    constructor(userModel: Model<User>, meetingModel: Model<Meeting>);
    newUser(params: any, newUserBodyDto: any, headers: any): Promise<string>;
    getUsers(params: any, res: any): Promise<{
        cssFileName: string;
        users: any[];
        url: any;
        date: any;
    }>;
    updateStatus(updateStatusBodyDto: any): Promise<string>;
    getStatuses(params: any): Promise<string>;
}
