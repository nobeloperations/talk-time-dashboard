import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class FeedbacksService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getPersonalFeedbacks(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: any;
        feedbacks: any;
        url: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    getNewFeedback(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        name: any;
        currentUser: any;
        url: any;
        users: any;
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    createFeedback(files: any, createFeedbackBody: any, params: any, res: any, req: any): Promise<string>;
}
