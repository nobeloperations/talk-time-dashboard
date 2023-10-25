import { Injectable } from '@nestjs/common';
import { BadgeModel } from 'models/badge.model';
import { Document, ObjectId } from 'mongoose';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Badge, NewBadgeBody, NewBadgeParams } from 'types/types';

@Injectable()
export class BadgesService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async newBadge(params: NewBadgeParams, newBadgeBody: NewBadgeBody): Promise<string | void> {
        try {
            const { name }: NewBadgeParams = params;
            let { badge }: NewBadgeBody = newBadgeBody;
            badge = badge.replaceAll(' ', '')
            const currentBadgeUser = await this.databaseUtilsService.findBadgeUserByName({ name })
            if(currentBadgeUser) {
                await this.databaseUtilsService.updateBadge(badge, name)
            }
            else {
                await this.databaseUtilsService.createBadgesUser(name)
                .then(async () => {
                    await this.databaseUtilsService.updateBadge(badge, name)
                })
            }
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }
}
