import { ProfileService } from './profile.service';
import { Request, Response } from 'express';
import { GetProfileParams } from 'types/types';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
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
