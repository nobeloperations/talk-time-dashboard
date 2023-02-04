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
exports.FeedbacksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("../../badge-config/config");
const DEFAULT_BADGE = 'Choose the Badge (not necessarily)';
const DEFAULT_TECH_BADGE = 'Select Technology';
let FeedbacksService = class FeedbacksService {
    constructor(feedbackModel, userModel) {
        this.feedbackModel = feedbackModel;
        this.userModel = userModel;
    }
    async getFeedbacks(params) {
        const { url } = params;
        const users = await this.userModel.find({ url });
        return { cssFileName: 'feedback', users, url };
    }
    async getPersonalFeedbacks(params) {
        const { url, name } = params;
        const feedbacks = await this.feedbackModel.find({ receiver: name, url });
        const currentUser = await this.userModel.findOne({ name, url });
        return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url };
    }
    async getNewFeedback(params) {
        const { url, name } = params;
        const currentUser = await this.userModel.findOne({ name, url });
        const users = await this.userModel.find({ url });
        return { cssFileName: 'new-feedback', name, currentUser, url, users };
    }
    async createFeedback(files, createFeedbackBodyDto, params, res) {
        var _a;
        let { sender, rating, feedback, badge, tech, level } = createFeedbackBodyDto;
        let { url, name } = params;
        let receiver = name;
        let sendUser = await this.userModel.findOne({ name: sender });
        if (badge !== DEFAULT_BADGE) {
            let key = `${badge.toLowerCase().split(' ').join('_')}`;
            let value = config_1.config[key];
            badge = `${key}${value}.png`;
            await this.userModel.findOneAndUpdate({ name: receiver, url }, { $push: { badges: { badge } } });
        }
        if (level || tech) {
            if (tech !== DEFAULT_TECH_BADGE && tech !== undefined) {
                let techBadge = `${tech}${level}`;
                await this.userModel.updateMany({ name: receiver }, { $push: { techs: { badge: techBadge } } });
            }
        }
        let newFeedback = new this.feedbackModel({
            sender,
            receiver,
            feedback,
            rating,
            url,
            senderImg: sendUser ? sendUser.avatar : 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
            feedbackImg: (_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename,
            date: new Date().toLocaleDateString()
        });
        await newFeedback.save();
        res.redirect(`/dashboard/${url}`);
    }
};
FeedbacksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Feedback')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FeedbacksService);
exports.FeedbacksService = FeedbacksService;
//# sourceMappingURL=feedbacks.service.js.map