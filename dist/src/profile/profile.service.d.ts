import { Request, Response } from 'express';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { GetProfileParams } from 'types/types';
export declare class ProfileService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    formatBadges(badgesObject: any): any[];
    getUsersMeetings(allUsers: any): Promise<any[]>;
    getProfile(req: Request, res: Response, params: GetProfileParams, generalName: string): Promise<void | {
        cssFileName: string;
        url: string;
        date: string;
        generalName: string;
        isAuth: boolean;
        notes: any;
        profileName: string;
        badges: any[];
        feedbacksReceived: any;
        feedbacksSent: any;
        profileEmail: string;
        profileAvatar: any;
        usersMeetings: any[];
        meetingsCount: any;
        title: string;
    }>;
}
