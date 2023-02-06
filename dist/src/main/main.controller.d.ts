import { MainService } from './main.service';
import { UrlDto } from 'global.dto';
import { AddGeneralDto } from 'src/main/dtos/add-general.dto';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    getMain(): Promise<{
        message: string;
        cssFileName: string;
        generals: (import("mongoose").Document<unknown, any, import("../../models/general.model").General> & import("../../models/general.model").General & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getSearchlist(params: UrlDto): Promise<{
        generals: (import("mongoose").Document<unknown, any, import("../../models/general.model").General> & import("../../models/general.model").General & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        cssFileName: string;
    }>;
    addGeneral(addGeneralBodyDto: AddGeneralDto): Promise<void>;
}
