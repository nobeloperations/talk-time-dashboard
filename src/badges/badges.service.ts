import { Injectable } from '@nestjs/common';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Badges, NewBadgeBody, NewBadgeParams } from 'types/types';
import { filterBadges } from '../../helpers/badges_level.js';
import { BadgeModel } from 'models/badge.model.js';


@Injectable()
export class BadgesService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async newBadge(params: NewBadgeParams, newBadgeBody: NewBadgeBody): Promise<string | void> {
        try {
            const { name }: NewBadgeParams = params;
            let { badge }: NewBadgeBody = newBadgeBody;
            badge = badge.replaceAll(' ', '')
            const currentBadgeUser: BadgeModel = await this.databaseUtilsService.findBadgeUserByName({ name })
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

    async calculateBadgeLevel(params) {
        const { name } = params;
        const badgeUser: BadgeModel = await this.databaseUtilsService.findBadgeUserByName({ name });
        const badges: Badges[] = badgeUser.badges;
        
        const formattedBadges = Object.entries(badges).map(([key, value]) => ({ [key]: value['count'] }));
        
        let maxBadgesCount: number = Math.max(...Object.values(badges).map(badge => badge['count']));
        maxBadgesCount = Math.min(9, Math.max(3, maxBadgesCount));
        
        const filteredBadges: string[] = filterBadges(formattedBadges, maxBadgesCount);
    
        return filteredBadges;
    }
}
