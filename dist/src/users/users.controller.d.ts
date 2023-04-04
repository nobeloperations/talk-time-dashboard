import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
