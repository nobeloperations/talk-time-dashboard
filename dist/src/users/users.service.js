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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
const user_cookies_1 = require("../../helpers/user_cookies");
let UserService = class UserService {
    constructor(userModel, meetingModel, authModel) {
        this.userModel = userModel;
        this.meetingModel = meetingModel;
        this.authModel = authModel;
    }
    async getUsersAvatar(params) {
        const { name } = params;
        let avatar = await this.userModel.findOne({ name }).select('avatar');
        return avatar;
    }
    async newUser(params, newUserBody, headers) {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date, generalName } = newUserBody;
                const isUserExsist = await this.userModel.findOne({ name, url, date });
                if (!isUserExsist) {
                    const newUser = new this.userModel({
                        name,
                        avatar,
                        url,
                        percents: '',
                        date,
                        generalName
                    });
                    await newUser.save();
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
            const { url, date } = params;
            let meeting = await this.meetingModel.findOne({ name: generalName });
            const currentMeeting = meeting === null || meeting === void 0 ? void 0 : meeting.meetings.some(curr => curr['date'] == date);
            if (!meeting || !currentMeeting) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
            }
            const dbUsers = await this.userModel.find({}).select('name avatar count badges');
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
            return { cssFileName: 'users', users, url, date, generalName, pageName: 'Users', profileName: userPayload.name };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async createUser(name, email, password) {
        const newUser = new this.authModel({ name, email, password });
        return newUser.save();
    }
    async findByEmail(email) {
        return this.authModel.findOne({ email }).exec();
    }
    async findByEmailAndName(user) {
        const { name, email } = user;
        const dbUser = await this.authModel.findOne({ email, name });
        return dbUser;
    }
    async findById(id) {
        return this.authModel.findById(id).exec();
    }
    async findByName(name) {
        return this.authModel.findOne({ name }).exec();
    }
    async updatePassword(email, password) {
        return this.authModel.updateOne({ email }, { password });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Meeting')),
    __param(2, (0, mongoose_1.InjectModel)('Auth')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map