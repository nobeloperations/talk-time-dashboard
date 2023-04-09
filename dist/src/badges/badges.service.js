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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BadgesService = class BadgesService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async newBadge(params, newBadgeBodyDto) {
        const { name } = params;
        const { badge } = newBadgeBodyDto;
        await this.userModel.updateMany({ name }, { $push: { badges: { badge } } });
    }
    async getFeedbackBadges(params) {
        const { url, name, date } = params;
        const currentUser = await this.userModel.findOne({ name, url });
        let badges = await this.userModel.findOne({ name }).select('badges');
        let convertedBadges = [];
        Array.from(badges.badges).forEach(o => {
            convertedBadges[o['badge']] ? convertedBadges[o['badge']] += 1 : convertedBadges[o['badge']] = 1;
        });
        let objectBadges = Object.assign({}, convertedBadges);
        let isBadges = !!Object.keys(objectBadges).length;
        return { cssFileName: 'feedback-badges', badges: objectBadges, isBadges, currentUser, url, name, date };
    }
};
BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BadgesService);
exports.BadgesService = BadgesService;
//# sourceMappingURL=badges.service.js.map