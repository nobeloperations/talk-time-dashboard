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
const config_1 = require("../../badge-config/config");
const path_1 = require("path");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
const DEFAULT_BADGE = 'Choose the Badge (not necessarily)';
let FeedbacksService = class FeedbacksService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async getPersonalFeedbacks(params, res, generalName, req) {
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            const { url, name, date } = params;
            const [feedbacks, currentUser] = await Promise.all([
                await this.databaseUtilsService.findFeedbacksByReceiverAndUrlAndDate(name, url, date),
                await this.databaseUtilsService.findUserByNameAndUrlAndDate(name, url, date)
            ]);
            if (!currentUser) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, pageName: `${name}'s feedbacks`, profileName: userPayload.name };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async getNewFeedback(params, res, generalName, req) {
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            const { url, name, date } = params;
            const [users, currentUser] = await Promise.all([
                await this.databaseUtilsService.findUsersByUrlAndDate(url, date),
                await this.databaseUtilsService.findUserByNameAndUrlAndDate(name, url, date)
            ]);
            if (!currentUser) {
                res.sendFile((0, path_1.resolve)('views/notfound.html'));
                return;
            }
            return { cssFileName: 'new-feedback', name, currentUser, url, users, date, generalName, pageName: "Leave feedback", profileName: userPayload.name };
        }
        catch (e) {
            res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
    }
    async createFeedback(files, createFeedbackBody, params, res, req) {
        var _a;
        try {
            const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            let { rating, feedback, badge } = createFeedbackBody;
            let { url, name, date, generalName } = params;
            let sendUser = await this.databaseUtilsService.findUserByName(userPayload.name);
            if (badge !== DEFAULT_BADGE) {
                let key = `${badge.toLowerCase().split(' ').join('_')}`;
                let value = config_1.config[key];
                badge = `${key}${value}.png`;
                await this.databaseUtilsService.updateUserBadges(name, badge);
            }
            await this.databaseUtilsService.createNewFeedback(userPayload.name, name, feedback, rating, url, sendUser.avatar, (_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename, date);
            res.redirect(`/dashboard/${url}/${date}?q=${generalName}`);
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