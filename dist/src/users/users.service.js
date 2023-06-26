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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
let UsersService = class UsersService {
    constructor(userModel, meetingModel) {
        this.userModel = userModel;
        this.meetingModel = meetingModel;
    }
    async getUsersAvatar(params) {
        const { name } = params;
        let avatar = await this.userModel.findOne({ name }).select('avatar');
        return avatar;
    }
    async newUser(params, newUserBodyDto, headers) {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date } = newUserBodyDto;
                const isUser = await this.userModel.findOne({ name, url, date });
                if (!isUser) {
                    const newUser = new this.userModel({
                        name,
                        avatar,
                        url,
                        peaks: [],
                        percents: '',
                        date
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
    async getUsers(params, res, generalName) {
        try {
            const { url, date } = params;
            let meeting = await this.meetingModel.findOne({ name: generalName });
            let currentMeeting = false;
            meeting === null || meeting === void 0 ? void 0 : meeting.meetings.forEach(curr => {
                if (curr['date'] == date)
                    currentMeeting = true;
            });
            if (!meeting || !currentMeeting) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
            }
            let dbUsers = await this.userModel.find({}).select('name avatar count badges');
            let users = [];
            dbUsers.forEach(async (user) => {
                users.push(user.toObject());
            });
            users = users.filter((value, index, self) => index === self.findIndex((t) => (t.name === value.name)));
            return { cssFileName: 'users', users, url, date, generalName, pageName: 'Users' };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async updateStatus(updateStatusBodyDto) {
        try {
            const { date, name, url, status } = updateStatusBodyDto;
            await this.userModel.updateOne({ name, url, date }, { status });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async getStatuses(params) {
        try {
            const { date, url } = params;
            const statuses = await this.userModel.find({ date, url }).select('name status avatar');
            return statuses;
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Meeting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map