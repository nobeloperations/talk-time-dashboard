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
    constructor(userModel, noteModel, feedbackModel) {
        this.userModel = userModel;
        this.noteModel = noteModel;
        this.feedbackModel = feedbackModel;
    }
    async getDashboard(params, res, generalName) {
        try {
            const { url, date } = params;
            const [users, notes, feedbacks] = await Promise.all([
                await this.userModel.find({ url, date }),
                await this.noteModel.find({ url, date }),
                await this.feedbackModel.find({ url, date })
            ]);
            if (!users.length) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            let feedbacksByName = {};
            users.forEach(({ name, avatar, percents }) => {
                feedbacksByName[name] = {
                    name,
                    rating: [],
                    avatar,
                    percents
                };
            });
            feedbacks.forEach(({ receiver, rating }) => {
                feedbacksByName[receiver].rating.push(rating);
            });
            return { cssFileName: 'dashboard', url, users, notes, usersLength: users.length, feedbacksLength: feedbacks.length, feedbacksByName, date, generalName, pageName: 'Dashboard' };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async updatePercents(params, postPercentsBody) {
        try {
            const { percents } = postPercentsBody;
            const { url, date } = params;
            percents.forEach(async ({ name, percent }) => {
                await this.userModel.findOneAndUpdate({ name, url, date }, { percents: percent });
            });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async newNote(params, createNoteBody) {
        try {
            const { url, date } = params;
            const { text, tags } = createNoteBody;
            const newNote = new this.noteModel({
                text,
                url,
                tags,
                date
            });
            await newNote.save();
            return JSON.stringify(newNote);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async deleteConclusion(deleteConclusionBody) {
        try {
            const { id } = deleteConclusionBody;
            await this.noteModel.deleteOne({ _id: id });
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