import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class MainService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getMain(req: any, res: any): Promise<{
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
    addMeeting(addGeneralBody: any): Promise<string>;
    getFAQ(): {
        cssFileName: string;
    };
}
