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
    getUserFriendRequests(name: string, res: Response): Promise<Response<any, Record<string, any>>>;
    newFriendRequest(params: any): Promise<void>;
    getFriendRequests(params: any): Promise<string>;
    getAllFriends(params: any): Promise<string>;
    addFriend(params: any): Promise<void>;
    deleteFriend(params: any): Promise<string>;
}
