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
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class ProfileService {
    private readonly userModel;
    private readonly feedbackModel;
    private readonly meetingModel;
    constructor(userModel: Model<User>, feedbackModel: Model<Feedback>, meetingModel: Model<Meeting>);
    getProfile(params: any, res: any, generalName: any): Promise<Error | {
        cssFileName: string;
        name: string;
        avatar: string;
        avgRating: number;
        meetingsCounter: number;
        feedbacksReceived: (import("mongoose").Document<unknown, any, Feedback> & Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        feedbacksSent: (import("mongoose").Document<unknown, any, Feedback> & Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        meetings: any[];
        usersBadges: {};
        generalName: any;
    }>;
}
