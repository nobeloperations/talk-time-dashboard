import { DashboardService } from './dashboard.service';
import { Response } from 'express';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(params: any, res: Response): Promise<{
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
        date: any;
        generalName: any;
    }>;
    postPercents(params: any, postPercentsBodyDto: any): Promise<string>;
    newConclusion(params: any, createConclusionBodyDto: any): Promise<string>;
    deleteConclusion(deleteConclusionBodyDto: any): Promise<string>;
    importantConclusion(importantConclusionBodyDto: any): Promise<string>;
}
