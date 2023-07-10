import { MainService } from './main.service';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    getMain(): Promise<string | {
        cssFileName: string;
        generals: (import("mongoose").Document<unknown, any, import("../../models/meeting.model").Meeting> & import("../../models/meeting.model").Meeting & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    addGeneral(addGeneralBody: Object): Promise<string>;
    getFAQ(): {
        cssFileName: string;
    };
}
