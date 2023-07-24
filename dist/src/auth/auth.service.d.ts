export declare class AuthService {
    constructor();
    googleLogin(req: any, res: any): "No user from google" | {
        email: any;
        picture: any;
        firstName: any;
        lastName: any;
        cssFileName: string;
    };
    logOut(res: any): void;
}
