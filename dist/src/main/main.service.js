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
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const user_cookies_1 = require("../../helpers/user_cookies");
const database_utils_service_1 = require("../database-utils/database-utils.service");
const axios_1 = require("axios");
let MainService = class MainService {
    constructor(databaseUtilsService) {
        this.databaseUtilsService = databaseUtilsService;
    }
    async getMain(req, res) {
        try {
            let userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return { cssFileName: 'main', isAuth: false };
            let usersMeetings = [];
            let generalNames = [];
            let currentUsers = await this.databaseUtilsService.findUsers({ name: userPayload.name }, "url date generalName");
            currentUsers.forEach(({ url, date, generalName }) => {
                usersMeetings.push({
                    url,
                    date
                });
                generalNames.push(generalName);
            });
            let generals = await this.databaseUtilsService.findMeetingsByNameIncluding(generalNames);
            const filteredGenerals = generals.map((general) => {
                const filteredMeetings = [];
                for (const meeting of general.meetings) {
                    usersMeetings.forEach((userMeeting) => {
                        if (userMeeting.url == meeting['url'] && userMeeting.date == meeting['date']) {
                            filteredMeetings.push(meeting);
                        }
                    });
                }
                return Object.assign(Object.assign({}, general), { meetings: filteredMeetings });
            });
            return { cssFileName: 'main', generals: filteredGenerals, title: "Main", profileName: userPayload.name, isAuth: true };
        }
        catch (e) {
            return res.status(404).render('notfound');
        }
    }
    async addMeeting(addGeneralBody) {
        try {
            const { name, url, date } = addGeneralBody;
            const meeting = await this.databaseUtilsService.findMeeting({ name }, '');
            if (!meeting && name !== 'Meeting Details')
                return await this.databaseUtilsService.createNewMeeting(name, url, date);
            let meetPresented = meeting === null || meeting === void 0 ? void 0 : meeting.meetings.filter(meeting => meeting['date'] === date && meeting['url'] === url).length;
            if (!meetPresented)
                return await this.databaseUtilsService.updateMeetingByName(name, url, date);
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async getFAQ(req) {
        try {
            let userPayload = (0, user_cookies_1.getUserFromCookies)(req);
            if (!userPayload)
                return { cssFileName: 'main', isAuth: false };
            return { cssFileName: 'faq', title: "FAQ", isAuth: true, profileName: userPayload.name };
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e });
        }
    }
    async validateGoogleMeetLink(req) {
        const { code } = req.params;
        const meeting = await axios_1.default.get(`http://3.67.185.26:5000/api/class-events/link/${code}`);
        return meeting ? JSON.stringify(meeting.data) : meeting;
    }
};
MainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService])
], MainService);
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map