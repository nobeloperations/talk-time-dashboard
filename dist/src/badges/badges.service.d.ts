import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { NewBadgeBody, NewBadgeParams } from 'types/types';
export declare class BadgesService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    newBadge(params: NewBadgeParams, newBadgeBody: NewBadgeBody): Promise<string | void>;
}
