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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const main_service_1 = require("./main.service");
let MainController = class MainController {
    constructor(mainService) {
        this.mainService = mainService;
    }
    getMain(req, res) {
        return this.mainService.getMain(req, res);
    }
    addGeneral(addGeneralBody) {
        return this.mainService.addMeeting(addGeneralBody);
    }
    getFAQ() {
        return { cssFileName: 'faq' };
    }
    getCurrentVersion() {
        return {
            version: '3.15'
        };
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.Render)('main'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getMain", null);
__decorate([
    (0, common_1.Post)('/main/addmeeting'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "addGeneral", null);
__decorate([
    (0, common_1.Get)('/faq'),
    (0, common_1.Render)('faq'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MainController.prototype, "getFAQ", null);
__decorate([
    (0, common_1.Get)('/currentversion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MainController.prototype, "getCurrentVersion", null);
MainController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [main_service_1.MainService])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map