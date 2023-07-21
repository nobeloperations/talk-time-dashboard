"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseUtilsModule = void 0;
const common_1 = require("@nestjs/common");
const database_utils_service_1 = require("./database-utils.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../../models/user.model");
const meeting_model_1 = require("../../models/meeting.model");
const note_model_1 = require("../../models/note.model");
const reset_model_1 = require("../../models/reset.model");
const auth_model_1 = require("../../models/auth.model");
const feedback_model_1 = require("../../models/feedback.model");
let DatabaseUtilsModule = class DatabaseUtilsModule {
};
DatabaseUtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: user_model_1.UserSchema },
                { name: "Meeting", schema: meeting_model_1.MeetingSchema },
                { name: "Note", schema: note_model_1.NoteSchema },
                { name: "Reset", schema: reset_model_1.ResetSchema },
                { name: "Auth", schema: auth_model_1.AuthSchema },
                { name: "Feedback", schema: feedback_model_1.FeedbackSchema }
            ])],
        providers: [database_utils_service_1.DatabaseUtilsService],
        exports: [database_utils_service_1.DatabaseUtilsService]
    })
], DatabaseUtilsModule);
exports.DatabaseUtilsModule = DatabaseUtilsModule;
//# sourceMappingURL=database-utils.module.js.map