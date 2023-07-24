import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: Response): "No user from google" | {
        email: any;
        picture: any;
        firstName: any;
        lastName: any;
        cssFileName: string;
    };
    logout(res: any): void;
}
