import { Request, Response } from 'express';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { AddGeneralBody, MainReturn, notAuthenticated } from 'types/types';
export declare class MainService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    formatBadges(badgesObject: any): any[];
    getMain(req: Request, res: Response): Promise<MainReturn | string | notAuthenticated | void>;
    addMeeting(addGeneralBody: AddGeneralBody): Promise<void | string>;
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
    validateGoogleMeetLink(req: Request): Promise<string | import("axios").AxiosResponse<any, any>>;
    getHallOfFame(req: Request, res: Response, generalName: string): Promise<any>;
    getMeetingStartTime(req: Request, res: Response, generalName: string): Promise<Response<any, Record<string, any>>>;
}
