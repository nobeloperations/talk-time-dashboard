"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticPagesModule = void 0;
const common_1 = require("@nestjs/common");
const information_service_1 = require("./information.service");
const information_controller_1 = require("./information.controller");
const mongoose_1 = require("@nestjs/mongoose");
const meeting_model_1 = require("../../models/meeting.model");
let StaticPagesModule = class StaticPagesModule {
};
StaticPagesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Meeting', schema: meeting_model_1.MeetingSchema }])],
        providers: [information_service_1.InformationService],
        controllers: [information_controller_1.InformationController]
    })
], StaticPagesModule);
exports.StaticPagesModule = StaticPagesModule;
//# sourceMappingURL=information.module.js.map