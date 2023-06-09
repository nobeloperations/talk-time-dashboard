import { Response } from 'express';
import { TestmodService } from './testmod.service';
export declare class TestmodController {
    private usersService;
    constructor(usersService: TestmodService);
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
