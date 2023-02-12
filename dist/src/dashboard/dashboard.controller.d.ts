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
