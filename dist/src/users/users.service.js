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
let UsersService = class UsersService {
    constructor(userModel, badgeModel) {
        this.userModel = userModel;
        this.badgeModel = badgeModel;
    }
    async newUser(params, newUserBodyDto, headers) {
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
            else {
                console.log('User already created');
            }
        }
        else {
            throw new common_1.HttpException('Invalid headers', 404);
        }
    }
    async getUsers(params) {
        const { url, date } = params;
        let dbUsers = await this.userModel.find({}).select('name avatar count');
        let users = [];
        dbUsers.forEach(async (user) => {
            this.userModel.countDocuments({ name: user.name }, async (_, count) => {
                await this.userModel.updateMany({ name: user.name }, { count });
            });
            users.push(user.toObject());
        });
        for (let user of users) {
            let currentBadges = await this.badgeModel.findOne({ name: user.name });
            user.badges = (currentBadges === null || currentBadges === void 0 ? void 0 : currentBadges.badges) || [];
        }
        return { cssFileName: 'users', users, url, date };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Badge')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map