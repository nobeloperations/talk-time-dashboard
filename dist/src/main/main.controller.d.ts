import { MainService } from './main.service';
import { Request } from 'express';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    getMain(req: Request, res: any): Promise<any>;
    addGeneral(addGeneralBody: Object): Promise<string | void>;
    getFAQ(): {
        cssFileName: string;
    };
    getCurrentVersion(): {
        version: string;
    };
}
