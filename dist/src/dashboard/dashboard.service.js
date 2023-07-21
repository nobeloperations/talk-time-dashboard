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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
let DashboardService = class DashboardService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async getDashboard(params, res, generalName, req) {
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            const { url, date } = params;
            const [users, notes, feedbacks] = await Promise.all([
                await this.databaseUtilsService.findUsersByUrlAndDate(url, date),
                await this.databaseUtilsService.findNotesByUrlAndDate(url, date),
                await this.databaseUtilsService.findFeedbacksByUrlAndDate(url, date)
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
            return { cssFileName: 'dashboard', url, users, notes, usersLength: users.length, feedbacksLength: feedbacks.length, feedbacksByName, date, generalName, pageName: 'Dashboard', profileName: userPayload.name };
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
                await this.databaseUtilsService.updateUserPercents(name, url, date, percent);
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
            const newNote = this.databaseUtilsService.createNewNote(url, date, text, tags);
            return newNote;
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async deleteNote(deleteNoteBody) {
        try {
            const { id } = deleteNoteBody;
            await this.databaseUtilsService.deleteNoteById(id);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map