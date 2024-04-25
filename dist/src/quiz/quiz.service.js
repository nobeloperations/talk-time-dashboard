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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
let QuizService = class QuizService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async getQuiz(params, req, res) {
        const userPayload = (0, user_cookies_1.getUserFromCookies)(req);
        if (!userPayload)
            return res.redirect('/');
        const { quiz } = await this.databaseUtilsService.findUser({ name: userPayload.name }, 'quiz');
        const { url, date } = params;
        return { url, date, cssFileName: 'quiz', isAuth: true, profileName: userPayload.name, title: "Quiz", isPassed: quiz };
    }
    async updateQuizResults(params) {
        const { name, index } = params;
        await this.databaseUtilsService.updateQuizResultsByIndex(+index, name);
    }
    async getQuizesResults(params) {
        const { name } = params;
        const badgeUser = await this.databaseUtilsService.findBadgeUserByName({ name });
        return badgeUser ? badgeUser.quizResults : null;
    }
    async getFinishQuiz(params, generalName) {
        const { result, url, date } = params;
        const title = result === "passed" ? "Congratulations!" : "Ooops...";
        const text = result === "passed" ? "You have successfully mastered the quiz!" : "Unfortunately, you have not mastered the quiz!";
        return { title, text, url, date, generalName };
    }
};
QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map