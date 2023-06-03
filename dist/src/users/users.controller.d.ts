import { UsersService } from './users.service';
import { Response } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    newUser(params: any, newUserBodyDto: any, headers: any): Promise<string>;
    getUsers(params: any, res: Response): Promise<{
        cssFileName: string;
        users: any[];
        url: any;
        date: any;
        generalName: any;
    }>;
    updateStatus(updateStatusBodyDto: any): Promise<string>;
    getStatuses(params: any): Promise<string>;
}
