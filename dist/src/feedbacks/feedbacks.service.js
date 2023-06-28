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
    async getPersonalFeedbacks(params, res, generalName) {
        try {
            const { url, name, date } = params;
            const [feedbacks, currentUser] = await Promise.all([
                await this.feedbackModel.find({ receiver: name, url, date }),
                await this.userModel.findOne({ name, url, date })
            ]);
            if (!currentUser) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, pageName: `${name}'s feedbacks` };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async getNewFeedback(params, res, generalName) {
        try {
            const { url, name, date } = params;
            const [users, currentUser] = await Promise.all([
                await this.userModel.find({ url, date }),
                await this.userModel.findOne({ name, url, date })
            ]);
            if (!currentUser) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            return { cssFileName: 'new-feedback', name, currentUser, url, users, date, generalName, pageName: "Leave feedback" };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async createFeedback(files, createFeedbackBody, params, res) {
        var _a;
        try {
            let { sender, rating, feedback, badge } = createFeedbackBody;
            let { url, name, date, generalName } = params;
            let sendUser = await this.userModel.findOne({ name: sender });
            if (badge !== DEFAULT_BADGE) {
                let key = `${badge.toLowerCase().split(' ').join('_')}`;
                let value = config_1.config[key];
                badge = `${key}${value}.png`;
                await this.userModel.updateMany({ name }, { $push: { badges: { badge } } });
            }
            let newFeedback = new this.feedbackModel({
                sender,
                receiver: name,
                feedback,
                rating,
                url,
                senderImg: sendUser.avatar,
                feedbackImg: (_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename,
                postDate: new Date().toLocaleDateString(),
                date
            });
            await newFeedback.save();
            res.redirect(`/dashboard/${url}/${date}?q=${generalName}`);
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