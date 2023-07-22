import { MainService } from './main.service';
import { Request } from 'express';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    getMain(req: Request): Promise<{
        cssFileName: string;
        generals: any;
        profileName: any;
        message?: undefined;
    } | {
        message: string;
        cssFileName?: undefined;
        generals?: undefined;
        profileName?: undefined;
    }>;
    addGeneral(addGeneralBody: Object): Promise<string>;
    getFAQ(): {
        cssFileName: string;
    };
}
