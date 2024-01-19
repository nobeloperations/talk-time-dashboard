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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
let ProfileService = class ProfileService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    formatBadges(badgesObject) {
        if (badgesObject) {
            const { badges } = badgesObject;
            const formattedBadges = [];
            Object.keys(badges).forEach(badge => {
                formattedBadges.push({ [badge]: badges[badge].count });
            });
            return formattedBadges;
        }
        else
            return [];
    }
    async getUsersMeetings(allUsers) {
        const usersMeetings = [];
        await Promise.all(allUsers.map(async (user) => {
            const { url, date } = user;
            const meeting = await this.databaseUtilsService.findMeetingsByNameAndDateIncluding({ url, date });
            if (meeting === null || meeting === void 0 ? void 0 : meeting.meetings.length) {
                meeting.meetings.forEach(meet => {
                    if (meet.url === url && meet.date === date) {
                        usersMeetings.push(Object.assign({ generalName: meeting.name }, meet));
                    }
                });
            }
        }));
        return usersMeetings;
    }
    async getProfile(req, res, params, generalName) {
        const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
        if (!userPayload)
            return res.redirect('/');
        const { name, email } = userPayload;
        const { url, date } = params;
        const [currentUser, allUsers, badges, feedbacksReceived, feedbacksSent, notes] = await Promise.all([
            await this.databaseUtilsService.findUser({ name }, ''),
            await this.databaseUtilsService.findUsers({ name }, ''),
            await this.databaseUtilsService.findBadgeUserByName({ name }),
            await this.databaseUtilsService.findFeedbacks({ receiver: name }, ''),
            await this.databaseUtilsService.findFeedbacks({ sender: name }, ''),
            await this.databaseUtilsService.findNotes({ sender: name }, '')
        ]);
        const badgesSent = currentUser === null || currentUser === void 0 ? void 0 : currentUser.badgesSent;
        const usersMeetings = await this.getUsersMeetings(allUsers);
        const formattedBadges = this.formatBadges(badges);
        formattedBadges.forEach(formattedBadge => {
            const numberOfBadges = Object.values(formattedBadge)[0];
            const badgeLevel = numberOfBadges < 3 ? 3 : numberOfBadges < 5 ? 5 : numberOfBadges < 10 ? 10 : 20;
            formattedBadge.badgesSentDiff = Math.max(badgeLevel - badgesSent, 0);
            formattedBadge.badgesReceivedDiff = Math.max(badgeLevel - numberOfBadges, 0);
            if (numberOfBadges < 3 || badgesSent < 3) {
                formattedBadge.level = 'knowledge';
            }
            else if (numberOfBadges < 5 || badgesSent < 5) {
                formattedBadge.level = 'apprentice';
            }
            else {
                formattedBadge.level = 'mastery & leadership';
            }
        });
        return { cssFileName: "profile", url, date, generalName, isAuth: true, notes, profileName: name, badges: formattedBadges, feedbacksReceived, feedbacksSent, profileEmail: email, profileAvatar: currentUser === null || currentUser === void 0 ? void 0 : currentUser.avatar, badgesSent: currentUser === null || currentUser === void 0 ? void 0 : currentUser.badgesSent, usersMeetings, meetingsCount: allUsers.length, title: `${name}'s profile` };
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map