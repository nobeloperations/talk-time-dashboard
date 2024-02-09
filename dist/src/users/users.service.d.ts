import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { GetUserAvatarParams, GetUsersParams, NewUserBody, NewUserParams } from 'types/types';
import { Response, Request } from 'express';
export declare class UserService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getUsersAvatar(params: GetUserAvatarParams): Promise<{
        avatar: string;
    }>;
    newUser(params: NewUserParams, newUserBody: NewUserBody, headers: Object): Promise<void | string>;
    getUsers(params: GetUsersParams, res: Response, generalName: string, req: Request): Promise<any | void>;
    getUsersInRange(page: number, limit: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getMeetingUsersStats(generalName: string, res: Response, req: Request): Promise<void | {
        url: string;
        date: string;
        generalName: string;
        badgesUsers: any;
        profileName: string;
        isAuth: boolean;
        title: string;
        cssFileName: string;
    }>;
}
