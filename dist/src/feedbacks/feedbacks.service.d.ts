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
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
export declare class FeedbacksService {
    private readonly feedbackModel;
    private readonly userModel;
    constructor(feedbackModel: Model<Feedback>, userModel: Model<User>);
    getPersonalFeedbacks(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        feedbacks: (import("mongoose").Document<unknown, any, Feedback> & Omit<Feedback & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        url: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    getNewFeedback(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        url: any;
        users: (import("mongoose").Document<unknown, any, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    createFeedback(files: any, createFeedbackBody: any, params: any, res: any, req: any): Promise<string>;
}
