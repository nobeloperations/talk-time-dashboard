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
    constructor(userModel, feedbackModel, noteModel, meetingModel, BadgeModel) {
        this.userModel = userModel;
        this.feedbackModel = feedbackModel;
        this.noteModel = noteModel;
        this.meetingModel = meetingModel;
        this.BadgeModel = BadgeModel;
    }
    async findBadgeUserByName(filter) {
        const badgeUser = await this.BadgeModel.findOne(filter);
        return badgeUser;
    }
    async updateUserBadgesSent(filter) {
        return await this.userModel.updateMany(filter, { $inc: { badgesSent: 1 } });
    }
    async updateBadge(badge, name) {
        await this.BadgeModel.updateOne({ name }, {
            $inc: {
                [`badges.${badge}.count`]: 1,
            },
        });
    }
    async findAllBadgesUsers() {
        return await this.BadgeModel.find({}).select('name badges');
    }
    async findBadgesUsersByNameIncluding(names) {
        return await this.BadgeModel.find({ name: { $in: names } });
    }
    async getCountOfBadgesUsers() {
        const count = await this.BadgeModel.countDocuments({});
        return count;
    }
    async findBadgesUsersInRange(page, limit) {
        const skip = (page - 1) * limit;
        let badgeUsers = await this.BadgeModel.find({}).skip(skip).limit(limit);
        return badgeUsers;
    }
    async createBadgesUser(name) {
        const badge = new this.BadgeModel({
            name,
            badges: {
                Fun: { count: 0 },
                Encourage: { count: 0 },
                BeeBrief: { count: 0 },
                BePresent: { count: 0 },
                ZenEnviroment: { count: 0 },
                OnTime: { count: 0 },
                Help: { count: 0 },
            }
        });
        await badge.save();
    }
    async updateUserBadges(name, badge) {
        return await this.userModel.updateMany({ name }, { $push: { badges: { badge } } });
    }
    async updateUserPercents(filter, update) {
        return await this.userModel.findOneAndUpdate(filter, update);
    }
    async findUsersByUrlIncluded(urls) {
        return await this.userModel.find({ url: { $in: urls } });
    }
    async findUsers(filter, fields) {
        return await this.userModel.find(filter).select(fields);
    }
    async findUser(filter, fields) {
        return await this.userModel.findOne(filter).select(fields);
    }
    async updateUser(filter, update) {
        return await this.userModel.updateOne(filter, update);
    }
    async updateUsers(filter, update) {
        return await this.userModel.updateMany(filter, update);
    }
    async findFeedbacks(filter, fields) {
        return await this.feedbackModel.find(filter).select(fields);
    }
    async findNotes(filter, fields) {
        return await this.noteModel.find(filter).select(fields);
    }
    async deleteNote(filter) {
        return await this.noteModel.deleteOne(filter);
    }
    async updateNote(filter, update) {
        return await this.noteModel.updateOne(filter, update);
    }
    async findMeetingsByNameIncluding(generalNames) {
        return await this.meetingModel.find({ name: { $in: generalNames } });
    }
    async findMeetingsByNameAndDateIncluding(filter) {
        return await this.meetingModel.findOne({ 'meetings.url': filter.url, 'meetings.date': filter.date });
    }
    async findMeeting(filter, fields) {
        return await this.meetingModel.findOne(filter).select(fields);
    }
    async updateMeetingByName(name, url, date) {
        return await this.meetingModel.updateOne({ name }, { $push: { meetings: { url, date, startTime: new Date().toISOString().toString() } } });
    }
    async createNewMeeting(name, url, date) {
        const newMeeting = new this.meetingModel({
            name,
            meetings: [{
                    url,
                    date,
                    startTime: new Date().toISOString().toString()
                }]
        });
        return await newMeeting.save();
    }
    async createNewFeedback(sender, receiver, feedback, rating, url, senderImg, feedbackImg, date, generalName) {
        let newFeedback = new this.feedbackModel({
            sender,
            receiver,
            feedback,
            rating,
            url,
            senderImg,
            feedbackImg,
            postDate: new Date().toLocaleDateString().replaceAll('.', '/'),
            date,
            generalName
        });
        return await newFeedback.save();
    }
    async createNewNote(url, date, text, sender, generalName) {
        const sendUser = await this.findUser({ name: sender }, 'avatar');
        const newNote = new this.noteModel({
            text,
            url,
            date,
            sender,
            avatar: sendUser ? sendUser['avatar'] : 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png',
            generalName
        });
        await newNote.save();
        return newNote;
    }
    async createNewUser(name, avatar, url, date, generalName) {
        const newUser = new this.userModel({
            name,
            avatar,
            url,
            percents: '',
            date,
            generalName,
            rating: 0,
            badgesSent: 0,
            friendRequest: [],
            friends: []
        });
        return await newUser.save();
    }
};
DatabaseUtilsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Feedback')),
    __param(2, (0, mongoose_1.InjectModel)('Note')),
    __param(3, (0, mongoose_1.InjectModel)('Meeting')),
    __param(4, (0, mongoose_1.InjectModel)('Badge')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DatabaseUtilsService);
exports.DatabaseUtilsService = DatabaseUtilsService;
//# sourceMappingURL=database-utils.service.js.map