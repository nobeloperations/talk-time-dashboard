"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestmodModule = void 0;
const common_1 = require("@nestjs/common");
const testmod_service_1 = require("./testmod.service");
const testmod_controller_1 = require("./testmod.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../../models/user.model");
const meeting_model_1 = require("../../models/meeting.model");
let TestmodModule = class TestmodModule {
};
TestmodModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_model_1.UserSchema }, { name: 'Meeting', schema: meeting_model_1.MeetingSchema }])],
        providers: [testmod_service_1.TestmodService],
        controllers: [testmod_controller_1.TestmodController]
    })
], TestmodModule);
exports.TestmodModule = TestmodModule;
//# sourceMappingURL=testmod.module.js.map