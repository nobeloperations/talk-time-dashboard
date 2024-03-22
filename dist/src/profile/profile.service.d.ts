import { Request, Response } from 'express';
import { User } from 'models/user.model';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { GetProfileParams } from 'types/types';
export declare class ProfileService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getUsersMeetings(allUsers: User[]): Promise<any[]>;
    getProfile(req: Request, res: Response, params: GetProfileParams, generalName: string): Promise<void | {
        cssFileName: string;
        url: string;
        date: string;
        generalName: string;
        isAuth: boolean;
        notes: any;
        profileName: string;
        feedbacksReceived: any;
        feedbacksSent: any;
        profileEmail: string;
        profileAvatar: any;
        badgesSent: any;
        usersMeetings: any[];
        meetingsCount: any;
        title: string;
    }>;
}
