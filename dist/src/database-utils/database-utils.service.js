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
    constructor(userModel, authModel, feedbackModel, noteModel, resetModel, meetingModel) {
        this.userModel = userModel;
        this.authModel = authModel;
        this.feedbackModel = feedbackModel;
        this.noteModel = noteModel;
        this.resetModel = resetModel;
        this.meetingModel = meetingModel;
    }
    async updateUserBadges(name, badge) {
        await this.userModel.updateMany({ name }, { $push: { badges: { badge } } });
    }
    async findFeedbacksByUrlAndDate(url, date) {
        return await this.feedbackModel.find({ url, date });
    }
    async findUsersByUrlAndDate(url, date) {
        return await this.userModel.find({ url, date });
    }
    async findNotesByUrlAndDate(url, date) {
        return await this.noteModel.find({ url, date });
    }
    async updateUserPercents(name, url, date, percent) {
        await this.userModel.findOneAndUpdate({ name, url, date }, { percents: percent });
    }
    async deleteNoteById(id) {
        await this.noteModel.deleteOne({ _id: id });
    }
    async findFeedbacksByReceiverAndUrlAndDate(name, url, date) {
        return await this.feedbackModel.find({ receiver: name, url, date });
    }
    async findUserByNameAndUrlAndDate(name, url, date) {
        return await this.userModel.findOne({ name, url, date });
    }
    async findUserByName(name) {
        return await this.userModel.findOne({ name });
    }
    async findUsersAndSelectFields(filter, fields) {
        return await this.userModel.find(filter).select(fields);
    }
    async findUserAvatarByName(name) {
        return await this.userModel.findOne({ name }).select('avatar');
    }
    async findMeetingsByNameIncluding(generalNames) {
        return await this.meetingModel.find({ name: { $in: generalNames } });
    }
    async findMeetingByName(name) {
        return await this.meetingModel.findOne({ name });
    }
    async UpdateMeetingByName(name, url, date) {
        await this.meetingModel.updateOne({ name }, { $push: { meetings: { url, date } } });
    }
    async findAuth(filters) {
        return await this.authModel.findOne(filters);
    }
    async updateAuthPassword(email, password) {
        return await this.authModel.updateOne({ email }, { password });
    }
    async deleteResetById(id) {
        await this.resetModel.deleteOne({ value: id });
    }
    async findResetById(id) {
        return await this.resetModel.findOne({ value: id });
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
    async createNewAuth(name, email, password) {
        const newUser = new this.authModel({ name, email, password });
        return newUser.save();
    }
    async createNewReset(id) {
        const newReset = new this.resetModel({
            value: id
        });
        newReset.save();
        return newReset;
    }
};
DatabaseUtilsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Auth')),
    __param(2, (0, mongoose_1.InjectModel)('Feedback')),
    __param(3, (0, mongoose_1.InjectModel)('Note')),
    __param(4, (0, mongoose_1.InjectModel)('Reset')),
    __param(5, (0, mongoose_1.InjectModel)('Meeting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DatabaseUtilsService);
exports.DatabaseUtilsService = DatabaseUtilsService;
//# sourceMappingURL=database-utils.service.js.map