import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';

@Injectable()
export class BadgesService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async newBadge(params, newBadgeBody) {
        try {
            const { name } = params;
            const { badge } = newBadgeBody;
            await this.databaseUtilsService.updateUserBadges(name, badge)
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }
}
