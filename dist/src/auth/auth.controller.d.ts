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
import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getSignin(): {
        cssFileName: string;
    };
    getSignup(): {
        cssFileName: string;
    };
    register(body: any): Promise<{
        message: string;
        user: any;
    }>;
    login(body: any): Promise<any>;
    getReset(params: any, res: Response): Promise<any>;
    createResetId(id: string): Promise<import("mongoose").Document<unknown, any, import("../../models/reset.model").Reset> & Omit<import("../../models/reset.model").Reset & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    resetPassword(params: any, body: any): Promise<void | {
        message: string;
    }>;
    sendEmail(body: any): Promise<void>;
}
