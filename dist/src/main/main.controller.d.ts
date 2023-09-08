import { MainService } from './main.service';
import { Request, Response } from 'express';
import { AddGeneralBody, MainReturn } from 'types/types';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    getMain(req: Request, res: Response): Promise<MainReturn | string | {
        cssFileName: string;
        isAuth: boolean;
    } | void>;
    addGeneral(addGeneralBody: AddGeneralBody): Promise<void | string>;
    getFAQ(): {
        cssFileName: string;
    };
    getCurrentVersion(): {
        version: string;
    };
}
