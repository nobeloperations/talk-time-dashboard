import { BadgesService } from './badges.service';
import { NewBadgeBody, NewBadgeParams } from 'types/types';
export declare class BadgesController {
    private badgesService;
    constructor(badgesService: BadgesService);
    newBadge(params: NewBadgeParams, newBadgeBody: NewBadgeBody): Promise<void | string>;
}
