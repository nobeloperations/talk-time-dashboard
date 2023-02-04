/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
