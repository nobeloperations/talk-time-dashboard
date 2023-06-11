import { MainService } from './main.service';
import { Response } from 'express';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    getWelcome(): {
        cssFileName: string;
    };
    getMain(): Promise<string | {
        cssFileName: string;
        meetings: (import("mongoose").Document<unknown, any, import("../../models/meeting.model").Meeting> & import("../../models/meeting.model").Meeting & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getSearchlist(params: any, res: Response): Promise<{
        meetingsResult: (import("mongoose").Document<unknown, any, import("../../models/meeting.model").Meeting> & import("../../models/meeting.model").Meeting & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        cssFileName: string;
    }>;
    addGeneral(addGeneralBodyDto: any): Promise<string>;
}
