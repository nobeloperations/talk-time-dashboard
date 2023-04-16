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
const path_1 = require("path");
const DEFAULT_BADGE = 'Choose the Badge (not necessarily)';
let FeedbacksService = class FeedbacksService {
    constructor(feedbackModel, userModel) {
        this.feedbackModel = feedbackModel;
        this.userModel = userModel;
    }
    async getFeedbacks(params, res) {
        try {
            const { url, date } = params;
            const users = await this.userModel.find({ url, date });
            if (!users.length) {
                res.status(404).sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            return { cssFileName: 'feedback', users, url, date };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async getPersonalFeedbacks(params, res) {
        try {
            const { url, name, date } = params;
            const feedbacks = await this.feedbackModel.find({ receiver: name, url, date });
            const currentUser = await this.userModel.findOne({ name, url, date });
            if (!currentUser) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async getNewFeedback(params, res) {
        try {
            const { url, name, date } = params;
            const currentUser = await this.userModel.findOne({ name, url, date });
            if (!currentUser) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            const users = await this.userModel.find({ url, date });
            return { cssFileName: 'new-feedback', name, currentUser, url, users, date };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async createFeedback(files, createFeedbackBodyDto, params, res) {
        var _a, _b;
        try {
            let { sender, rating, feedback, badge } = createFeedbackBodyDto;
            let { url, name, date } = params;
            let receiver = name;
            let sendUser = await this.userModel.findOne({ name: sender });
            if (badge !== DEFAULT_BADGE) {
                let key = `${badge.toLowerCase().split(' ').join('_')}`;
                let value = config_1.config[key];
                badge = `${key}${value}.png`;
                await this.userModel.updateMany({ name: receiver }, { $push: { badges: { badge } } });
            }
            let newFeedback = new this.feedbackModel({
                sender,
                receiver,
                feedback,
                rating,
                url,
                senderImg: (_a = sendUser === null || sendUser === void 0 ? void 0 : sendUser.avatar) !== null && _a !== void 0 ? _a : 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
                feedbackImg: (_b = files[0]) === null || _b === void 0 ? void 0 : _b.filename,
                postDate: new Date().toLocaleDateString(),
                date
            });
            await newFeedback.save();
            res.redirect(`/dashboard/${url}/${date}`);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
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