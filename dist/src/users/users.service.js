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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
let UserService = class UserService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async getUsersAvatar(params) {
        const { name } = params;
        let avatar = await this.databaseUtilsService.findUser({ name }, 'avatar');
        return avatar;
    }
    async newUser(params, newUserBody, headers) {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date, generalName } = newUserBody;
                const isUserExsist = await this.databaseUtilsService.findUser({ name, url, date }, '');
                if (!isUserExsist) {
                    await this.databaseUtilsService.createNewUser(name, avatar, url, date, generalName);
                }
            }
            else {
                throw new common_1.HttpException('Invalid headers', 404);
            }
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async getUsers(params, res, generalName, req) {
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return res.redirect('/');
            const { url, date } = params;
            let meeting = await this.databaseUtilsService.findMeeting({ name: generalName }, '');
            const currentMeeting = meeting === null || meeting === void 0 ? void 0 : meeting.meetings.some(curr => curr['date'] == date);
            if (!meeting || !currentMeeting) {
                return res.sendFile((0, path_1.resolve)('views/notfound.html'));
            }
            const dbUsers = await this.databaseUtilsService.findUsers({}, 'name avatar count badges');
            let users = [];
            for (const user of dbUsers) {
                const existingUser = users.find(u => u.name === user.name);
                if (!existingUser) {
                    users.push(user.toObject());
                }
            }
            users = users.map(user => {
                const uniqueBadges = [];
                const badgeCounts = {};
                user.badges.forEach(badge => {
                    const badgeName = badge.badge;
                    if (!uniqueBadges.includes(badgeName)) {
                        uniqueBadges.push(badgeName);
                    }
                    if (!badgeCounts[badgeName]) {
                        badgeCounts[badgeName] = 0;
                    }
                    badgeCounts[badgeName]++;
                });
                const updatedBadges = uniqueBadges.map(badgeName => ({
                    badge: badgeName,
                    count: badgeCounts[badgeName]
                }));
                return Object.assign(Object.assign({}, user), { badges: updatedBadges });
            });
            return { cssFileName: 'users', users, url, date, generalName, pageName: 'Users', profileName: userPayload.name, isAuth: true };
        }
        catch (e) {
            return res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map