import { JwtService } from '@nestjs/jwt';
import { Auth } from 'models/auth.model';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class AuthService {
    private readonly databaseUtilsService;
    private readonly jwtService;
    constructor(databaseUtilsService: DatabaseUtilsService, jwtService: JwtService);
    getSignin(): {
        cssFileName: string;
    };
    getSignup(): {
        cssFileName: string;
    };
    login(user: Auth): Promise<any>;
    signup(user: Auth): Promise<any>;
    getReset(params: any, res: any): Promise<any>;
    createResetId(body: any): Promise<any>;
    resetPassword(params: any, body: any): Promise<void | {
        message: string;
    }>;
    sendEmail(body: any): Promise<void>;
}
