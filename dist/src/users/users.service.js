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
                if (!isUserExsist)
                    return await this.databaseUtilsService.createNewUser(name, avatar, url, date, generalName);
                const badgeUser = await this.databaseUtilsService.findBadgeUserByName({ name });
                if (!badgeUser)
                    await this.databaseUtilsService.createBadgesUser(name);
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
            return { cssFileName: 'users', url, date, generalName, profileName: userPayload.name, isAuth: true, title: "Add Friends" };
        }
        catch (e) {
            return res.status(404).render('notfound');
        }
    }
    async getUserFriendRequests(params, res) {
        const { name } = params;
        const user = await this.databaseUtilsService.findUser({ name }, '');
        return res.json({ friendRequests: user.friendRequests });
    }
    async getUsersInRange(page, limit, res) {
        try {
            let users = await this.databaseUtilsService.findBadgesUsersInRange(page, limit);
            users = await Promise.all(users.map(async (user) => {
                const { name } = user;
                const { friendRequests } = await this.databaseUtilsService.findUser({ name }, 'friendRequests');
                return Object.assign(Object.assign({}, user._doc), { friendRequests });
            }));
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async getMeetingUsersStats(generalName, res, req) {
        const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
        if (!userPayload)
            return res.redirect('/');
        const { url, date } = req.params;
        const names = new Set();
        const urls = new Set();
        const { meetings } = await this.databaseUtilsService.findMeeting({ name: generalName }, '');
        meetings.forEach(meeting => { urls.add(meeting.url); });
        const uniqueUrls = Array.from(urls);
        const users = await this.databaseUtilsService.findUsersByUrlIncluded(uniqueUrls);
        users.forEach(user => { names.add(user.name); });
        const uniqueNames = Array.from(names);
        let badgesUsers = await this.databaseUtilsService.findBadgesUsersByNameIncluding(uniqueNames);
        badgesUsers = await Promise.all(badgesUsers.map(async (badgesUser) => {
            const totalBadges = Object.values(badgesUser.badges).reduce((acc, curr) => acc + curr.count, 0);
            const { badgesSent } = await this.databaseUtilsService.findUser({ name: badgesUser.name }, 'badgesSent');
            return Object.assign(Object.assign({}, badgesUser._doc), { badgesSent, totalBadges });
        }));
        return { url, date, generalName, badgesUsers, profileName: userPayload.name, isAuth: true, title: `${generalName} participants`, cssFileName: 'meeting-stats' };
    }
    async newFriendRequest(params) {
        let { name, sender } = params;
        await this.databaseUtilsService.updateUsers({ name }, { $push: { friendRequests: sender } });
    }
    async getFriendRequests(params) {
        const { name } = params;
        const currentUser = await this.databaseUtilsService.findUser({ name }, 'friendRequests');
        return JSON.stringify({ friendRequests: currentUser.friendRequests });
    }
    async addFriend(params) {
        const { sender, receiver } = params;
        await this.databaseUtilsService.updateUsers({ name: receiver }, { $pull: { friendRequests: sender } });
        await this.databaseUtilsService.updateUsers({ name: sender }, { $push: { friends: receiver } });
        await this.databaseUtilsService.updateUsers({ name: receiver }, { $push: { friends: sender } });
    }
    async getAllFriends(params) {
        const { name } = params;
        const currentUser = await this.databaseUtilsService.findUser({ name }, '');
        const { friends, friendRequests } = currentUser;
        return JSON.stringify({ friends, friendRequests });
    }
    async deleteFriend(params) {
        const { receiver, sender } = params;
        await this.databaseUtilsService.updateUsers({ name: receiver }, { $pull: { friends: sender } });
        await this.databaseUtilsService.updateUsers({ name: sender }, { $pull: { friends: receiver } });
        await this.databaseUtilsService.updateUsers({ name: receiver }, { $pull: { friendRequests: sender } });
        await this.databaseUtilsService.updateUsers({ name: sender }, { $pull: { friendRequests: receiver } });
        return JSON.stringify({ message: "All good" });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map