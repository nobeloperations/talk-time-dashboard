import { AuthService } from './auth.service';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: Request): Promise<void>;
    googleAuthRedirect(req: Request): string | import("../../types/types").GoogleLoginReturn;
    logout(res: Response): void;
}
