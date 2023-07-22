import { UserService } from './users.service';
import { Request, Response } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UserService);
    getUsersAvatar(params: Object): Promise<any>;
    newUser(params: Object, newUserBody: Object, headers: Object): Promise<string>;
    getUsers(params: Object, res: Response, generalName: string, req: Request): Promise<{
        cssFileName: string;
        users: any[];
        url: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
}
