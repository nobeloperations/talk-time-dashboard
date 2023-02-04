import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    newUser(params: any, newUserBodyDto: any, headers: any): Promise<void>;
}
