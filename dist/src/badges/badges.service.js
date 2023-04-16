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
const path_1 = require("path");
let BadgesService = class BadgesService {
    constructor(userModel, meetingModel) {
        this.userModel = userModel;
        this.meetingModel = meetingModel;
    }
    async newBadge(params, newBadgeBodyDto) {
        try {
            const { name } = params;
            const { badge } = newBadgeBodyDto;
            await this.userModel.updateMany({ name }, { $push: { badges: { badge } } });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async getFeedbackBadges(params, res) {
        try {
            const { url, name, date } = params;
            const currentUser = await this.userModel.findOne({ name, url });
            const meeting = await this.meetingModel.findOne({ name: url });
            let currentMeeting = false;
            meeting.meetings.forEach(curr => {
                if (curr['date'] == date)
                    currentMeeting = true;
            });
            if (!currentUser || !meeting || !currentMeeting) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            let badges = await this.userModel.findOne({ name }).select('badges');
            let convertedBadges = [];
            Array.from(badges.badges).forEach(o => {
                convertedBadges[o['badge']] ? convertedBadges[o['badge']] += 1 : convertedBadges[o['badge']] = 1;
            });
            let objectBadges = Object.assign({}, convertedBadges);
            let isBadges = !!Object.keys(objectBadges).length;
            return { cssFileName: 'feedback-badges', badges: objectBadges, isBadges, currentUser, url, name, date };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
            return;
        }
    }
};
BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Meeting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BadgesService);
exports.BadgesService = BadgesService;
//# sourceMappingURL=badges.service.js.map