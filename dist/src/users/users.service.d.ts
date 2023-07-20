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
/// <reference types="mongoose/types/inferschematype" />
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { Meeting } from 'models/meeting.model';
import { Auth } from 'models/auth.model';
export declare class UserService {
    private readonly userModel;
    private readonly meetingModel;
    private readonly authModel;
    constructor(userModel: Model<User>, meetingModel: Model<Meeting>, authModel: Model<Auth>);
    getUsersAvatar(params: any): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
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
    createUser(name: any, email: any, password: any): Promise<import("mongoose").Document<unknown, any, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByEmail(email: any): Promise<import("mongoose").Document<unknown, any, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByEmailAndName(user: any): Promise<import("mongoose").Document<unknown, any, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findById(id: any): Promise<import("mongoose").Document<unknown, any, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByName(name: any): Promise<import("mongoose").Document<unknown, any, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updatePassword(email: any, password: any): Promise<any>;
}
