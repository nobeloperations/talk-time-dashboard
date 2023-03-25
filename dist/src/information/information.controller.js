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
exports.InformationController = void 0;
const common_1 = require("@nestjs/common");
const information_service_1 = require("./information.service");
const global_dto_1 = require("../../global.dto");
let InformationController = class InformationController {
    constructor(informationService) {
        this.informationService = informationService;
    }
    getBadges(params) {
        return this.informationService.getInformation(params);
    }
};
__decorate([
    (0, common_1.Get)('/:url/:date'),
    (0, common_1.Render)('information'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [global_dto_1.UrlDto]),
    __metadata("design:returntype", void 0)
], InformationController.prototype, "getBadges", null);
InformationController = __decorate([
    (0, common_1.Controller)('information'),
    __metadata("design:paramtypes", [information_service_1.InformationService])
], InformationController);
exports.InformationController = InformationController;
//# sourceMappingURL=information.controller.js.map