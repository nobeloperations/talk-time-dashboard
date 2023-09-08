import { Request, Response } from 'express';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { AddGeneralBody, MainReturn } from 'types/types';
export declare class MainService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getMain(req: Request, res: Response): Promise<MainReturn | string | {
        cssFileName: string;
        isAuth: boolean;
    } | void>;
    addMeeting(addGeneralBody: AddGeneralBody): Promise<void | string>;
}
