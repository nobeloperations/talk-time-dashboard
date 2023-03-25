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
/// <reference types="mongoose/types/inferschematype" />
import { Conclusion } from 'models/conclusion.model';
import { Feedback } from 'models/feedback.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class DashboardService {
    private readonly userModel;
    private readonly conclusionModel;
    private readonly feedbackModel;
    constructor(userModel: Model<User>, conclusionModel: Model<Conclusion>, feedbackModel: Model<Feedback>);
    getDashboard(params: any): Promise<{
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
    }>;
    postPercents(params: any, postPercentsBodyDto: any): Promise<void>;
    newConclusion(params: any, createConclusionBodyDto: any): Promise<string>;
    deleteConclusion(deleteConclusionBodyDto: any): Promise<void>;
    importantConclusion(importantConclusionBodyDto: any): Promise<void>;
}
