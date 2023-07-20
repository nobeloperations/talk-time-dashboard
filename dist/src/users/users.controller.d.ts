/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from './users.service';
import { Request, Response } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UserService);
    getUsersAvatar(params: Object): Promise<import("mongoose").Document<unknown, any, import("../../models/user.model").User> & Omit<import("../../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
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
