import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class MainService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getMain(req: any, res: any): Promise<any>;
    addMeeting(addGeneralBody: any): Promise<string | void>;
    getFAQ(): {
        cssFileName: string;
    };
}
