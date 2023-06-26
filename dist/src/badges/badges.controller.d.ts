import { BadgesService } from './badges.service';
export declare class BadgesController {
    private badgesService;
    constructor(badgesService: BadgesService);
    newBadge(params: any, newBadgeBody: any): Promise<string>;
}
