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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
let DashboardService = class DashboardService {
    constructor(userModel, conclusionModel, feedbackModel) {
        this.userModel = userModel;
        this.conclusionModel = conclusionModel;
        this.feedbackModel = feedbackModel;
    }
    async getDashboard(params, res) {
        try {
            const { url, date, generalName } = params;
            const users = await this.userModel.find({ url, date });
            console.log(url, date);
            const conclusions = await this.conclusionModel.find({ url, date });
            const feedbacks = await this.feedbackModel.find({ url, date });
            if (!users.length) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            let feedbacksByName = {};
            users.forEach(user => {
                feedbacksByName[user.name] = {
                    name: user.name,
                    rating: [],
                    avatar: user.avatar,
                    percents: user.percents,
                    peaks: user.peaks
                };
            });
            feedbacks.forEach(feedback => {
                feedbacksByName[feedback.receiver].rating.push(feedback.rating);
            });
            return { cssFileName: 'dashboard', url, users, conclusions, usersLength: users.length, feedbacksLength: feedbacks.length, conclusionsLength: conclusions.length, feedbacksByName, date, generalName, pageName: 'Dashboard' };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async postPercents(params, postPercentsBodyDto) {
        try {
            const { percents } = postPercentsBodyDto;
            const { url, date } = params;
            percents.forEach(async (percent) => {
                await this.userModel.findOneAndUpdate({ name: percent.name, url, date }, { percents: percent.percent });
            });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async newConclusion(params, createConclusionBodyDto) {
        try {
            const { url, date } = params;
            const { text, tags } = createConclusionBodyDto;
            const newConclusion = new this.conclusionModel({
                text,
                url,
                tags,
                date
            });
            await newConclusion.save();
            return JSON.stringify(newConclusion);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async deleteConclusion(deleteConclusionBodyDto) {
        try {
            const { id } = deleteConclusionBodyDto;
            await this.conclusionModel.deleteOne({ _id: id });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async importantConclusion(importantConclusionBodyDto) {
        try {
            const { id } = importantConclusionBodyDto;
            await this.conclusionModel.findOneAndUpdate({ _id: id }, { important: true });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Conclusion')),
    __param(2, (0, mongoose_1.InjectModel)('Feedback')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map