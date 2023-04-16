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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
let CommentsService = class CommentsService {
    constructor(feedbackModel, userModel, meetingModel) {
        this.feedbackModel = feedbackModel;
        this.userModel = userModel;
        this.meetingModel = meetingModel;
    }
    async getComments(params, res) {
        try {
            const { id, url, date } = params;
            let feedback = await this.feedbackModel.findOne({ _id: id, url });
            let users = await this.userModel.find({ url, date });
            let meeting = await this.meetingModel.findOne({ url, date });
            let currentMeeting = false;
            meeting.meetings.forEach(curr => {
                if (curr['date'] == date)
                    currentMeeting = true;
            });
            if (!feedback || !meeting || !currentMeeting) {
                res.redirect((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            return { cssFileName: 'comments', url, users, feedback, date };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async newComment(params, newCommentBodyDto, res) {
        try {
            const { id, url } = params;
            const { comment, commentName } = newCommentBodyDto;
            await this.feedbackModel.findOneAndUpdate({ _id: id, url }, { $push: { comments: { commentName, comment, date: new Date().toLocaleDateString() } } });
            res.redirect(`/comments/${url}/${id}`);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Feedback')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Meeting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map