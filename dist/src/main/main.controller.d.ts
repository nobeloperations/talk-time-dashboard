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
    getFAQ(req: Request): Promise<string | {
        cssFileName: string;
        isAuth: boolean;
        title?: undefined;
        profileName?: undefined;
    } | {
        cssFileName: string;
        title: string;
        isAuth: boolean;
        profileName: string;
    }>;
    getCurrentVersion(): {
        version: string;
    };
    getPolicy(): void;
}
