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
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
let DashboardService = class DashboardService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async getDashboard(params, res, generalName, req) {
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return res.redirect('/');
            const { url, date } = params;
            const [users, notes, feedbacks] = await Promise.all([
                await this.databaseUtilsService.findUsers({ url, date }, ''),
                await this.databaseUtilsService.findNotes({ url, date }, ''),
                await this.databaseUtilsService.findFeedbacks({ url, date }, '')
            ]);
            if (!users.length) {
                return res.status(404).render('notfound');
            }
            return { cssFileName: 'dashboard', url, users, notes, usersLength: users.length, feedbacksLength: feedbacks.length, date, generalName, profileName: userPayload.name, isAuth: true, title: "Dashboard" };
        }
        catch (e) {
            throw new Error(`THIS IS ERROR ${e}`);
        }
    }
    async updatePercents(params, postPercentsBody) {
        try {
            const { percents } = postPercentsBody;
            const { url, date } = params;
            percents.forEach(async (percentage) => {
                const { name, percent } = percentage;
                if (name.trim() && percent.trim()) {
                    return await this.databaseUtilsService.updateUserPercents({ name, url, date }, { percents: percent });
                }
            });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async newNote(params, createNoteBody) {
        try {
            let { url, date } = params;
            let { text, tags, sender } = createNoteBody;
            const newNote = this.databaseUtilsService.createNewNote(url, date, text, tags, sender);
            return newNote;
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async deleteNote(deleteNoteBody) {
        try {
            const { id } = deleteNoteBody;
            return await this.databaseUtilsService.deleteNote({ _id: id });
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async updateNote(updateNoteBody) {
        const { id, text } = updateNoteBody;
        return await this.databaseUtilsService.updateNote({ _id: id }, { text });
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map