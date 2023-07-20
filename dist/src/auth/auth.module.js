"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const meeting_model_1 = require("../../models/meeting.model");
const user_model_1 = require("../../models/user.model");
const auth_model_1 = require("../../models/auth.model");
const reset_model_1 = require("../../models/reset.model");
const { JWT_SECRET } = process.env;
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Meeting', schema: meeting_model_1.MeetingSchema }, { name: "User", schema: user_model_1.UserSchema }, { name: "Auth", schema: auth_model_1.AuthSchema }, { name: 'Reset', schema: reset_model_1.ResetSchema }]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: JWT_SECRET,
                signOptions: { expiresIn: '7d' },
            }),
            users_module_1.UsersModule
        ],
        providers: [auth_service_1.AuthService, users_service_1.UserService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map