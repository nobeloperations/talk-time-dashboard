import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { NewBadgeBody, NewBadgeParams } from 'types/types';
export declare class BadgesService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getBadgesLevelInNumbers(badgeCount: number): number;
    getBadgesLevelName(badgeCount: number): string;
    splitByUpperCase(object: {}): string;
    newBadge(params: NewBadgeParams, newBadgeBody: NewBadgeBody): Promise<string | void>;
    calculateBadgeLevel({ name }: {
        name: string;
    }): Promise<{
        allBadgesStats: any;
        allowedBadges: any;
    }>;
}
