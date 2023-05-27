import { BadgesService } from './badges.service';
export declare class BadgesController {
    private badgesService;
    constructor(badgesService: BadgesService);
    newBadge(params: any, newBadgeBodyDto: any): Promise<string>;
}
