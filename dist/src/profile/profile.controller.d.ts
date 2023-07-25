import { ProfileService } from './profile.service';
import { Response } from 'express';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile(params: Object, res: Response, generalName: string): Promise<any>;
}
