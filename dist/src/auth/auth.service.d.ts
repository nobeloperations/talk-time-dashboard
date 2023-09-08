import { GoogleLoginReturn } from 'types/types';
import { Response } from 'express';
export declare class AuthService {
    constructor();
    googleLogin(req: any): GoogleLoginReturn | string;
    logOut(res: Response): void;
}
