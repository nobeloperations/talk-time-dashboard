import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class MainService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getMain(req: any): Promise<{
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
    addMeeting(addGeneralBody: any): Promise<string>;
    getFAQ(): {
        cssFileName: string;
    };
}
