import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { GetUserAvatarParams, GetUsersParams, GetUsersReturn, NewUserBody, NewUserParams } from 'types/types';
import { Response, Request } from 'express';
export declare class UserService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getUsersAvatar(params: GetUserAvatarParams): Promise<{
        avatar: string;
    }>;
    newUser(params: NewUserParams, newUserBody: NewUserBody, headers: Object): Promise<void | string>;
    getUsers(params: GetUsersParams, res: Response, generalName: string, req: Request): Promise<GetUsersReturn | void>;
}
