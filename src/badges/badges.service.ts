import { Injectable } from '@nestjs/common';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Badges, NewBadgeBody, NewBadgeParams } from 'types/types';
import { BadgeModel } from 'models/badge.model.js';
import { checkBadgesLevels } from 'helpers/badges_level';

@Injectable()
export class BadgesService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    getBadgesLevelInNumbers(badgeCount: number): number {
        return badgeCount < 3 ? 3 : badgeCount < 5 ? 5 : badgeCount < 10 ? 10 : 20
    }

    getBadgesLevelName(badgeCount: number): string {
        return badgeCount < 3 ? 'Knowlege' : badgeCount < 5 ? 'Apprentice' : badgeCount < 10 ? 'Mastery' : 'Leadership'
    }

    splitByUpperCase(object: {}) {
        return Object.keys(object)[0].split(/(?=[A-Z])/).join(' ')
    }

    async newBadge(params: NewBadgeParams, newBadgeBody: NewBadgeBody): Promise<string | void> {
        try {
            const { name }: NewBadgeParams = params;
            let { badge, from }: NewBadgeBody = newBadgeBody;

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
            await this.databaseUtilsService.updateUserBadgesSent({ name: from })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async calculateBadgeLevel({ name }: { name: string }): Promise<{ allBadgesStats, allowedBadges }> {
        const badgeUser: BadgeModel = await this.databaseUtilsService.findBadgeUserByName({ name });
        const badges: Badges[] = badgeUser.badges;
    
        const formattedBadges = Object.entries(badges).map(([key, value]) => ({ [key]: value['count'] as number }));
        const onlyLevels = formattedBadges.map(formattedBadge => Object.values(formattedBadge)[0]);
    
        const highestBadge = Math.max(...onlyLevels);
        const levelOfHighestBadge = this.getBadgesLevelInNumbers(highestBadge);
        const previousLevel = levelOfHighestBadge === 3 ? 3 : levelOfHighestBadge === 5 ? 3 : levelOfHighestBadge === 10 ? 5 : 10;
    
        const isBadgesLevelsSame = checkBadgesLevels(onlyLevels);
    
        let allowedBadges;
    
        if (!isBadgesLevelsSame) {
            allowedBadges = formattedBadges.reduce((result: string[], formattedBadge: any) => {
                const value: number | any = Object.values(formattedBadge)[0];
                const name: string = this.splitByUpperCase(formattedBadge);
    
                if (!(value <= levelOfHighestBadge && value >= previousLevel)) {
                    result.push(name);
                }
    
                return result;
            }, []);
        } else {
            allowedBadges = formattedBadges.map(formattedBadge => this.splitByUpperCase(formattedBadge));
        }
    
        const allBadgesStats = formattedBadges.map((formattedBadge: any) => {
            const badgesCount: number | any = Object.values(formattedBadge)[0];
            const level = this.getBadgesLevelName(badgesCount);
            const name = this.splitByUpperCase(formattedBadge);
    
            return { level, name, count: badgesCount };
        });
    
        return { allowedBadges, allBadgesStats };
    }
    
}
