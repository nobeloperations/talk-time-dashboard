"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const database_utils_service_1 = require("../database-utils/database-utils.service");
const badges_level_1 = require("../../helpers/badges_level");
let BadgesService = class BadgesService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    getBadgesLevelInNumbers(badgeCount) {
        return badgeCount < 3 ? 3 : badgeCount < 5 ? 5 : badgeCount < 10 ? 10 : 20;
    }
    getBadgesLevelName(badgeCount) {
        return badgeCount < 3 ? 'Knowlege' : badgeCount < 5 ? 'Apprentice' : badgeCount >= 5 ? 'Mastery' : 'Mastery';
    }
    splitByUpperCase(object) {
        return Object.keys(object)[0].split(/(?=[A-Z])/).join(' ');
    }
    async newBadge(params, newBadgeBody) {
        try {
            const { name } = params;
            let { badge, from } = newBadgeBody;
            badge = badge.replaceAll(' ', '');
            const currentBadgeUser = await this.databaseUtilsService.findBadgeUserByName({ name });
            if (currentBadgeUser) {
                await this.databaseUtilsService.updateBadge(badge, name);
            }
            else {
                await this.databaseUtilsService.createBadgesUser(name)
                    .then(async () => {
                    await this.databaseUtilsService.updateBadge(badge, name);
                });
            }
            await this.databaseUtilsService.updateUserBadgesSent({ name: from });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async calculateBadgeLevel({ name }) {
        const badgeUser = await this.databaseUtilsService.findBadgeUserByName({ name });
        const badges = badgeUser.badges;
        const formattedBadges = Object.entries(badges).map(([key, value]) => ({ [key]: value['count'] }));
        const onlyLevels = formattedBadges.map(formattedBadge => Object.values(formattedBadge)[0]);
        const highestBadge = Math.max(...onlyLevels);
        const levelOfHighestBadge = this.getBadgesLevelInNumbers(highestBadge);
        const previousLevel = levelOfHighestBadge === 3 ? 3 : levelOfHighestBadge === 5 ? 3 : levelOfHighestBadge === 10 ? 5 : 10;
        const isBadgesLevelsSame = (0, badges_level_1.checkBadgesLevels)(onlyLevels);
        let allowedBadges = [];
        if (!isBadgesLevelsSame) {
            allowedBadges = formattedBadges.reduce((result, formattedBadge) => {
                const value = Object.values(formattedBadge)[0];
                const name = this.splitByUpperCase(formattedBadge);
                if (!(value <= levelOfHighestBadge && value >= previousLevel) && value < 5) {
                    result.push(name);
                }
                return result;
            }, []);
        }
        else {
            formattedBadges.forEach(formattedBadge => {
                const badgeCount = Object.values(formattedBadge)[0];
                if (badgeCount < 5)
                    allowedBadges.push(this.splitByUpperCase(formattedBadge));
            });
        }
        const allBadgesStats = formattedBadges.map((formattedBadge) => {
            const badgesCount = Object.values(formattedBadge)[0];
            const level = this.getBadgesLevelName(badgesCount);
            const name = this.splitByUpperCase(formattedBadge);
            return { level, name, count: badgesCount };
        });
        return { allowedBadges, allBadgesStats };
    }
};
BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], BadgesService);
exports.BadgesService = BadgesService;
//# sourceMappingURL=badges.service.js.map