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
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'models/auth.model';
import { Model } from 'mongoose';
import { Reset } from 'models/reset.model';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly resetModel;
    constructor(userService: UserService, jwtService: JwtService, resetModel: Model<Reset>);
    getSignin(): {
        cssFileName: string;
    };
    getSignup(): {
        cssFileName: string;
    };
    login(user: Auth): Promise<any>;
    signup(user: Auth): Promise<any>;
    getReset(params: any, res: any): Promise<any>;
    createResetId(body: any): Promise<import("mongoose").Document<unknown, any, Reset> & Omit<Reset & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    resetPassword(params: any, body: any): Promise<void | {
        message: string;
    }>;
    sendEmail(body: any): Promise<void>;
}
