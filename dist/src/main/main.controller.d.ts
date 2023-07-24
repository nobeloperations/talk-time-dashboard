import { MainService } from './main.service';
import { Request } from 'express';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    getMain(req: Request, res: any): Promise<{
        cssFileName: string;
        isAuth: boolean;
        generals?: undefined;
        profileName?: undefined;
        message?: undefined;
    } | {
        cssFileName: string;
        generals: any;
        profileName: any;
        isAuth: boolean;
        message?: undefined;
    } | {
        message: string;
        cssFileName?: undefined;
        isAuth?: undefined;
        generals?: undefined;
        profileName?: undefined;
    }>;
    addGeneral(addGeneralBody: Object): Promise<string>;
    getFAQ(): {
        cssFileName: string;
    };
}
