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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
let ProfileService = class ProfileService {
    constructor(userModel, feedbackModel, meetingModel) {
        this.userModel = userModel;
        this.feedbackModel = feedbackModel;
        this.meetingModel = meetingModel;
    }
    async getProfile(params, res, generalName) {
        try {
            const { name } = params;
            const [nameAndAvatar, currentUsers, feedbacksReceived, feedbacksSent, currentUser] = await Promise.all([
                await this.userModel.findOne({ name }).select('name avatar'),
                await this.userModel.find({ name }),
                await this.feedbackModel.find({ receiver: name }),
                await this.feedbackModel.find({ sender: name }),
                await this.userModel.findOne({ name })
            ]);
            if (!currentUsers.length) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            const avgRating = feedbacksReceived.length
                ? Math.floor(feedbacksReceived.reduce((total, feedback) => total + feedback.rating, 0) / feedbacksReceived.length)
                : undefined;
            const badgesResult = {};
            const usersBadges = Object.entries(badgesResult).map(([key, value]) => ({ [key]: value }));
            for (const item of currentUser.badges) {
                const key = item['badge'];
                badgesResult[key] = badgesResult[key] ? badgesResult[key] + 1 : 1;
            }
            let meetingUrls = Array.from(new Set(currentUsers.map(currentUser => currentUser.url)));
            let meetingDates = Array.from(new Set(currentUsers.map(currentUser => currentUser['date'])));
            let meetings = [];
            let meetingsByUrl = await this.meetingModel.find({ url: { $in: meetingUrls } });
            for (let meetingByUrl of meetingsByUrl) {
                meetingByUrl.meetings.forEach(meeting => {
                    if (meetingDates.includes(meeting['date']))
                        meetings.push(meeting);
                });
            }
            return { cssFileName: 'profile', name: nameAndAvatar.name, avatar: nameAndAvatar.avatar, avgRating, meetingsCounter: currentUsers.length, feedbacksReceived, feedbacksSent, meetings, usersBadges, generalName };
        }
        catch (e) {
            return new Error(e);
        }
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Feedback')),
    __param(2, (0, mongoose_1.InjectModel)('Meeting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map