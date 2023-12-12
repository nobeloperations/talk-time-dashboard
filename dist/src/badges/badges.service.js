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
const badges_level_js_1 = require("../../helpers/badges_level.js");
let BadgesService = class BadgesService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async newBadge(params, newBadgeBody) {
        try {
            const { name } = params;
            let { badge } = newBadgeBody;
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
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async calculateBadgeLevel(params) {
        const { name } = params;
        const badgeUser = await this.databaseUtilsService.findBadgeUserByName({ name });
        const badges = badgeUser.badges;
        const formattedBadges = Object.entries(badges).map(([key, value]) => ({ [key]: value['count'] }));
        let maxBadgesCount = Math.max(...Object.values(badges).map(badge => badge['count']));
        maxBadgesCount = Math.min(9, Math.max(3, maxBadgesCount));
        const filteredBadges = (0, badges_level_js_1.filterBadges)(formattedBadges, maxBadgesCount);
        return filteredBadges;
    }
};
BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], BadgesService);
exports.BadgesService = BadgesService;
//# sourceMappingURL=badges.service.js.map