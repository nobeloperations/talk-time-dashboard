import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class BadgesService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    newBadge(params: any, newBadgeBody: any): Promise<string>;
}
