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
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
const axios_1 = require("axios");
const hall_of_fame_1 = require("../../helpers/hall-of-fame");
let MainService = class MainService {
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
    async getMain(req, res) {
        try {
            let userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return { cssFileName: 'main', isAuth: false };
            let usersMeetings = [];
            let generalNames = [];
            let currentUsers = await this.databaseUtilsService.findUsers({ name: userPayload.name }, "url date generalName");
            currentUsers.forEach(({ url, date, generalName }) => {
                usersMeetings.push({
                    url,
                    date
                });
                generalNames.push(generalName);
            });
            let generals = await this.databaseUtilsService.findMeetingsByNameIncluding(generalNames);
            let currentUser = await this.databaseUtilsService.findUser({ name: userPayload.name }, '');
            let badges = await this.databaseUtilsService.findBadgeUserByName({ name: currentUser.name });
            const badgesSent = currentUser === null || currentUser === void 0 ? void 0 : currentUser.badgesSent;
            const formattedBadges = this.formatBadges(badges);
            formattedBadges.forEach(formattedBadge => {
                const numberOfBadges = Object.values(formattedBadge)[0];
                const badgeLevel = numberOfBadges < 3 ? 3 : numberOfBadges < 5 ? 5 : numberOfBadges < 10 ? 10 : 20;
                formattedBadge.badgesSentDiff = Math.max(badgeLevel - badgesSent, 0);
                formattedBadge.badgesReceivedDiff = Math.max(badgeLevel - numberOfBadges, 0);
                if (numberOfBadges < 3 || badgesSent < 3) {
                    formattedBadge.level = 'Knowledge';
                }
                else if (numberOfBadges < 5 || badgesSent < 5) {
                    formattedBadge.level = 'Apprentice';
                }
                else if (numberOfBadges < 10 || badgesSent < 10) {
                    formattedBadge.level = 'Mastery';
                }
                else {
                    formattedBadge.level = "Leadership";
                }
            });
            const filteredGenerals = generals.map((general) => {
                const filteredMeetings = [];
                for (const meeting of general.meetings) {
                    usersMeetings.forEach((userMeeting) => {
                        if (userMeeting.url == meeting['url'] && userMeeting.date == meeting['date']) {
                            filteredMeetings.push(meeting);
                        }
                    });
                }
                return Object.assign(Object.assign({}, general), { meetings: filteredMeetings });
            });
            return { cssFileName: 'main', generals: filteredGenerals, badges: formattedBadges, title: "Main", profileName: userPayload.name, isAuth: true, badgesSent };
        }
        catch (e) {
            return res.status(404).render('notfound');
        }
    }
    async addMeeting(addGeneralBody) {
        try {
            const { name, url, date } = addGeneralBody;
            const meeting = await this.databaseUtilsService.findMeeting({ name }, '');
            if (!meeting && name !== 'Meeting Details')
                return await this.databaseUtilsService.createNewMeeting(name, url, date);
            let meetPresented = meeting === null || meeting === void 0 ? void 0 : meeting.meetings.filter(meeting => meeting['date'] === date && meeting['url'] === url).length;
            if (!meetPresented)
                return await this.databaseUtilsService.updateMeetingByName(name, url, date);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async getFAQ(req) {
        try {
            let userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return { cssFileName: 'main', isAuth: false };
            return { cssFileName: 'faq', title: "FAQ", isAuth: true, profileName: userPayload.name };
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async validateGoogleMeetLink(req) {
        const { code } = req.params;
        const meeting = await axios_1.default.get(`http://52.57.170.54:5000/api/class-events/link/${code}`);
        return meeting ? JSON.stringify(meeting.data) : meeting;
    }
    async getHallOfFame(req, res, generalName) {
        const { url, date } = req.params;
        const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
        if (!userPayload)
            return res.redirect('/');
        const badgesUsers = await this.databaseUtilsService.findAllBadgesUsers();
        const topUsers = (0, hall_of_fame_1.calculateUsersWithMostBadges)(badgesUsers);
        return { cssFileName: 'hall-of-fame', title: 'Hall of Fame', isAuth: true, url, date, generalName, profileName: userPayload.name, topUsers };
    }
    async getMeetingStartTime(req, res, generalName) {
        const { url, date } = req.params;
        const now = new Date();
        let meetingStartTime;
        const { meetings } = await this.databaseUtilsService.findMeeting({ name: generalName }, 'meetings');
        meetings.forEach(meeting => {
            if (meeting.url === url && meeting.date === date)
                meetingStartTime = new Date(meeting.startTime);
        });
        const diffInDates = Math.abs(now - meetingStartTime);
        const diffInHours = diffInDates / (1000 * 60 * 60);
        return res.status(200).json({ diffInHours }).end();
    }
};
MainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], MainService);
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map