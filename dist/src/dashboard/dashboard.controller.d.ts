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
import { DashboardService } from './dashboard.service';
import { postPercentsDto } from './dtos/post-percents.dto';
import { CreateConclusionDto } from './dtos/create-conclusion.dto';
import { IdDto, UrlDto } from '../../global.dto';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(params: UrlDto): Promise<{
        cssFileName: string;
        url: any;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        conclusions: (import("mongoose").Document<unknown, any, import("../../models/conclusion.model").Conclusion> & import("../../models/conclusion.model").Conclusion & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        usersLength: number;
        feedbacksLength: number;
        conclusionsLength: number;
        feedbacksByName: {};
    }>;
    postPercents(params: UrlDto, postPercentsBodyDto: postPercentsDto): Promise<void>;
    newConclusion(params: UrlDto, createConclusionBodyDto: CreateConclusionDto): Promise<string>;
    deleteConclusion(deleteConclusionBodyDto: IdDto): Promise<void>;
    importantConclusion(importantConclusionBodyDto: IdDto): Promise<void>;
}
