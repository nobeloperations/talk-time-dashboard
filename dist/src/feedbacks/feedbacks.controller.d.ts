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
import { FeedbacksService } from './feedbacks.service';
import { Response } from 'express';
export declare class FeedbacksController {
    private feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    getPersonalFeedbacks(params: Object, res: Response, generalName: String): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        feedbacks: (import("mongoose").Document<unknown, any, import("../../models/feedback.model").Feedback> & import("../../models/feedback.model").Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
        date: any;
        generalName: any;
        pageName: string;
    }>;
    getNewFeedback(params: Object, res: Response, generalName: String): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        url: any;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        date: any;
        generalName: any;
        pageName: string;
    }>;
    createFeedback(files: any, createFeedbackBody: any, params: any, res: Response): Promise<string>;
}
