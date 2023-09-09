import { UserService } from './users.service';
import { Request, Response } from 'express';
import { GetUserAvatarParams, GetUsersParams, NewUserBody, NewUserParams } from 'types/types';
export declare class UsersController {
    private usersService;
    constructor(usersService: UserService);
    getUsersAvatar(params: GetUserAvatarParams): Promise<{
        avatar: string;
    }>;
    newUser(params: NewUserParams, newUserBody: NewUserBody, headers: Object): Promise<void | string>;
    getUsers(params: GetUsersParams, res: Response, generalName: string, req: Request): Promise<any>;
}
