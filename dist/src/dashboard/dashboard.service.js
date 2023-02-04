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
let DashboardService = class DashboardService {
    constructor(userModel, conclusionModel, feedbackModel) {
        this.userModel = userModel;
        this.conclusionModel = conclusionModel;
        this.feedbackModel = feedbackModel;
    }
    async getDashboard(params) {
        const { url } = params;
        const users = await this.userModel.find({ url });
        const conclusions = await this.conclusionModel.find({ url });
        const feedbacks = await this.feedbackModel.find({ url });
        let feedbacksByName = {};
        users.forEach(user => {
            feedbacksByName[user.name] = {
                name: user.name,
                rating: [],
                avatar: user.avatar,
            };
        });
        feedbacks.forEach(feedback => {
            feedbacksByName[feedback.receiver].rating.push(feedback.rating);
        });
        return { cssFileName: 'dashboard', url, users, conclusions, usersLength: users.length, feedbacksLength: feedbacks.length, conclusionsLength: conclusions.length, feedbacksByName };
    }
    async postPercents(params, postPercentsBodyDto) {
        const { percents } = postPercentsBodyDto;
        const { url } = params;
        percents.forEach(async (percent) => {
            await this.userModel.findOneAndUpdate({ name: percent.name, url }, { percents: percent.percent });
        });
    }
    async newConclusion(params, createConclusionBodyDto) {
        const { url } = params;
        const { text, tags } = createConclusionBodyDto;
        const newConclusion = new this.conclusionModel({
            text,
            url,
            tags
        });
        await newConclusion.save();
        return JSON.stringify(newConclusion);
    }
    async deleteConclusion(deleteConclusionBodyDto) {
        const { id } = deleteConclusionBodyDto;
        await this.conclusionModel.deleteOne({ _id: id });
    }
    async importantConclusion(importantConclusionBodyDto) {
        const { id } = importantConclusionBodyDto;
        await this.conclusionModel.findOneAndUpdate({ _id: id }, { important: true });
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