"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const main_module_1 = require("./main/main.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const feedbacks_module_1 = require("./feedbacks/feedbacks.module");
const platform_express_1 = require("@nestjs/platform-express");
const users_module_1 = require("./users/users.module");
const badges_module_1 = require("./badges/badges.module");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const database_utils_module_1 = require("./database-utils/database-utils.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env' }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL),
            platform_express_1.MulterModule.register({
                dest: '../public/uploads'
            }),
            main_module_1.MainModule,
            dashboard_module_1.DashboardModule,
            feedbacks_module_1.FeedbacksModule,
            users_module_1.UsersModule,
            badges_module_1.BadgesModule,
            database_utils_module_1.DatabaseUtilsModule,
            auth_module_1.AuthModule
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map