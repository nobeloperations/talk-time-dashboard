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
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MainService = class MainService {
    constructor(meetingModel) {
        this.meetingModel = meetingModel;
    }
    test(body) {
        console.log(body);
    }
    async getMain() {
        let meetings = await this.meetingModel.find();
        return { message: 'hello', cssFileName: 'main', meetings };
    }
    async getSearchlist(params) {
        const { url } = params;
        const meetingsResult = await this.meetingModel.find({ name: url });
        return { meetingsResult, cssFileName: 'searchlist' };
    }
    async addMeeting(addGeneralBodyDto) {
        const { name, url, date } = addGeneralBodyDto;
        const meeting = await this.meetingModel.findOne({ name });
        if (!meeting && name !== 'Meeting Details') {
            const newMeeting = new this.meetingModel({
                name,
                meetings: [{
                        url,
                        date
                    }]
            });
            await newMeeting.save();
        }
        else {
            const currentMeet = await this.meetingModel.findOne({ name });
            let meetPresented = currentMeet === null || currentMeet === void 0 ? void 0 : currentMeet.meetings.filter(meeting => meeting['date'] === date && meeting['url'] === url).length;
            if (!meetPresented) {
                await this.meetingModel.updateOne({ name }, { $push: { meetings: { url, date } } });
            }
        }
    }
};
MainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Meeting')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MainService);
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map