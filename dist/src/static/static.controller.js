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
exports.StaticController = void 0;
const common_1 = require("@nestjs/common");
const static_service_1 = require("./static.service");
let StaticController = class StaticController {
    constructor(staticService) {
        this.staticService = staticService;
    }
    getFAQ() {
        return this.staticService.getFAQ();
    }
    getContacts() {
        return this.staticService.getContacts();
    }
};
__decorate([
    (0, common_1.Get)('/faq'),
    (0, common_1.Render)('faq'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticController.prototype, "getFAQ", null);
__decorate([
    (0, common_1.Get)('/contacts'),
    (0, common_1.Render)('contacts'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticController.prototype, "getContacts", null);
StaticController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [static_service_1.StaticService])
], StaticController);
exports.StaticController = StaticController;
//# sourceMappingURL=static.controller.js.map