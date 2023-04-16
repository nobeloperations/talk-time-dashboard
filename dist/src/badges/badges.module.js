"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesModule = void 0;
const common_1 = require("@nestjs/common");
const badges_service_1 = require("./badges.service");
const badges_controller_1 = require("./badges.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../../models/user.model");
const meeting_model_1 = require("../../models/meeting.model");
let BadgesModule = class BadgesModule {
};
BadgesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_model_1.UserSchema }, { name: 'Meeting', schema: meeting_model_1.MeetingSchema }])],
        providers: [badges_service_1.BadgesService],
        controllers: [badges_controller_1.BadgesController]
    })
], BadgesModule);
exports.BadgesModule = BadgesModule;
//# sourceMappingURL=badges.module.js.map