import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Response, Request } from 'express';
import { CreateFeedbackBody, CreateNewFeedbackParams, FeedbackImage, GetNewFeedbackParams, GetNewFeedbackReturn, GetPersonalFeedbacksParams, GetPersonalFeedbacksReturn } from 'types/types';
export declare class FeedbacksService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getPersonalFeedbacks(params: GetPersonalFeedbacksParams, res: Response, generalName: string, req: Request): Promise<GetPersonalFeedbacksReturn | void>;
    getNewFeedback(params: GetNewFeedbackParams, res: Response, generalName: string, req: Request): Promise<GetNewFeedbackReturn | void>;
    createFeedback(files: FeedbackImage[], createFeedbackBody: CreateFeedbackBody, params: CreateNewFeedbackParams, res: Response, req: Request): Promise<void | string>;
}
