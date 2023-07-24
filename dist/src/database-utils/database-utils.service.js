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
exports.DatabaseUtilsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DatabaseUtilsService = class DatabaseUtilsService {
    constructor(userModel, feedbackModel, noteModel, meetingModel) {
        this.userModel = userModel;
        this.feedbackModel = feedbackModel;
        this.noteModel = noteModel;
        this.meetingModel = meetingModel;
    }
    async updateUserBadges(name, badge) {
        await this.userModel.updateMany({ name }, { $push: { badges: { badge } } });
    }
    async updateUserPercents(name, url, date, percent) {
        await this.userModel.findOneAndUpdate({ name, url, date }, { percents: percent });
    }
    async findUsers(filter, fields) {
        return await this.userModel.find(filter).select(fields);
    }
    async findUser(filter, fields) {
        return await this.userModel.findOne(filter).select(fields);
    }
    async findFeedbacks(filter, fields) {
        return await this.feedbackModel.find(filter).select(fields);
    }
    async findNotes(filter, fields) {
        return await this.noteModel.find(filter).select(fields);
    }
    async deleteNote(filter) {
        await this.noteModel.deleteOne(filter);
    }
    async findMeetingsByNameIncluding(generalNames) {
        return await this.meetingModel.find({ name: { $in: generalNames } });
    }
    async findMeeting(filter, fields) {
        return await this.meetingModel.findOne(filter).select(fields);
    }
    async updateMeetingByName(name, url, date) {
        await this.meetingModel.updateOne({ name }, { $push: { meetings: { url, date } } });
    }
    async createNewMeeting(name, url, date) {
        const newMeeting = new this.meetingModel({
            name,
            meetings: [{
                    url,
                    date
                }]
        });
        await newMeeting.save();
    }
    async createNewFeedback(sender, receiver, feedback, rating, url, senderImg, feedbackImg, date) {
        let newFeedback = new this.feedbackModel({
            sender,
            receiver,
            feedback,
            rating,
            url,
            senderImg,
            feedbackImg,
            postDate: new Date().toLocaleDateString(),
            date
        });
        await newFeedback.save();
    }
    async createNewNote(url, date, text, tags) {
        const newNote = new this.noteModel({
            text,
            url,
            tags,
            date
        });
        await newNote.save();
        return JSON.stringify(newNote);
    }
    async createNewUser(name, avatar, url, date, generalName) {
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
};
DatabaseUtilsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Feedback')),
    __param(2, (0, mongoose_1.InjectModel)('Note')),
    __param(3, (0, mongoose_1.InjectModel)('Meeting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DatabaseUtilsService);
exports.DatabaseUtilsService = DatabaseUtilsService;
//# sourceMappingURL=database-utils.service.js.map