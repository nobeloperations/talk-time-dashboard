import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class FeedbacksService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getPersonalFeedbacks(params: any, res: any, generalName: any, req: any): Promise<any>;
    getNewFeedback(params: any, res: any, generalName: any, req: any): Promise<any>;
    createFeedback(files: any, createFeedbackBody: any, params: any, res: any, req: any): Promise<any>;
}
