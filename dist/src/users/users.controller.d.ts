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
import { UsersService } from './users.service';
import { Response } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsersAvatar(params: any): Promise<import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    newUser(params: any, newUserBodyDto: any, headers: any): Promise<string>;
    getUsers(params: any, res: Response, generalName: any): Promise<{
        cssFileName: string;
        users: any[];
        url: any;
        date: any;
        generalName: any;
        pageName: string;
    }>;
    updateStatus(updateStatusBodyDto: any): Promise<string>;
    getStatuses(params: any): Promise<string | (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
