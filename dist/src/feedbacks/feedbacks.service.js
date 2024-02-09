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
exports.FeedbacksService = void 0;
const common_1 = require("@nestjs/common");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
let FeedbacksService = class FeedbacksService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async getPersonalFeedbacks(params, res, generalName, req) {
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return res.redirect('/');
            const { url, name, date } = params;
            const [feedbacks, currentUser] = await Promise.all([
                await this.databaseUtilsService.findFeedbacks({ receiver: name, url, date }, ''),
                await this.databaseUtilsService.findUser({ name, url, date }, '')
            ]);
            if (!currentUser) {
                return res.status(404).render('notfound');
            }
            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, profileName: userPayload.name, isAuth: true, title: `${name}'s feedbacks` };
        }
        catch (e) {
            return res.status(404).render('notfound');
        }
    }
    async getNewFeedback(params, res, generalName, req) {
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return res.redirect('/');
            const { url, receiver, date } = params;
            const currentUser = await this.databaseUtilsService.findUser({ receiver, url, date }, '');
            if (!currentUser) {
                return res.status(404).render('notfound');
            }
            return { cssFileName: 'new-feedback', receiver, currentUser, url, date, generalName, profileName: userPayload.name, isAuth: true, title: `New feedback about ${receiver}` };
        }
        catch (e) {
            return res.status(404).render('notfound');
        }
    }
    async createFeedback(files, createFeedbackBody, params, res, req) {
        var _a;
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return res.redirect('/');
            let { rating, feedback } = createFeedbackBody;
            let { url, receiver, date, generalName } = params;
            let sendUser = await this.databaseUtilsService.findUser({ name: userPayload.name }, '');
            await this.databaseUtilsService.updateUser({ name: receiver, url, date }, { $push: { rating } });
            await this.databaseUtilsService.createNewFeedback(userPayload.name, receiver, feedback, rating, url, sendUser.avatar, (_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename, date, generalName);
            return res.redirect(`/dashboard/${url}/${date}?q=${generalName}`);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
};
FeedbacksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], FeedbacksService);
exports.FeedbacksService = FeedbacksService;
//# sourceMappingURL=feedbacks.service.js.map