import { Conclusion } from '../../models/conclusion.model';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
export declare class DashboardService {
    private readonly userModel;
    private readonly conclusionModel;
    private readonly feedbackModel;
    constructor(userModel: Model<User>, conclusionModel: Model<Conclusion>, feedbackModel: Model<Feedback>);
    getDashboard(params: any, res: any): Promise<{
        cssFileName: string;
        url: any;
        users: (import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        conclusions: (import("mongoose").Document<unknown, any, Conclusion> & Conclusion & {
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
