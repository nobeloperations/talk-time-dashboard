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
    createResetId(id: string): Promise<any>;
    resetPassword(params: any, body: any): Promise<void | {
        message: string;
    }>;
    sendEmail(body: any): Promise<void>;
}
