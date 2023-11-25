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
    async getBadgesLevel(params) {
        try {
            let badgesLevels = [];
            const { username } = params;
            const badgesUser = await this.databaseUtilsService.findBadgeUserByName({ name: username });
            let entries = Object.entries(badgesUser.badges);
            entries.forEach(([key, value]) => {
                badgesLevels.push({ [key]: value['count'] });
            });
            const badgeCounts = badgesLevels.map(badgeLevel => Object.values(badgeLevel)[0]);
            const badgesMin = Math.min(...badgeCounts);
            if (badgesMin < 3) {
                badgesLevels = badgesLevels.filter(badgesLevel => +Object.values(badgesLevel)[0] >= 3);
            }
            console.log(badgesLevels);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
};
BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], BadgesService);
exports.BadgesService = BadgesService;
//# sourceMappingURL=badges.service.js.map