import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class UserService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getUsersAvatar(params: any): Promise<any>;
    newUser(params: any, newUserBody: any, headers: any): Promise<string>;
    getUsers(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        users: any[];
        url: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
}
