import { FeedbacksService } from './feedbacks.service';
import { UrlDto } from 'global.dto';
import { PersonalFeedbacksDto } from './dtos/personal-feedbacks.dto';
import { Response } from 'express';
import { GetNewFeedbackParamDto, createFeedbackBodyDto } from 'src/feedbacks/dtos/new-feedback.dto';
export declare class FeedbacksController {
    private feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    getFeedbacks(params: UrlDto): Promise<{
        cssFileName: string;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
    }>;
    getPersonalFeedbacks(params: PersonalFeedbacksDto): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        feedbacks: (import("mongoose").Document<unknown, any, import("../../models/feedback.model").Feedback> & import("../../models/feedback.model").Feedback & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        url: any;
    }>;
    getNewFeedback(params: GetNewFeedbackParamDto): Promise<{
        cssFileName: string;
        name: any;
        currentUser: import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        url: any;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    createFeedback(files: any, createFeedbackBodyDto: createFeedbackBodyDto, params: GetNewFeedbackParamDto, res: Response): Promise<void>;
}
