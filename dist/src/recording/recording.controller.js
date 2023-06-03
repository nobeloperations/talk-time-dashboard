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
exports.RecordingController = void 0;
const common_1 = require("@nestjs/common");
const recording_service_1 = require("./recording.service");
let RecordingController = class RecordingController {
    constructor(recordingService) {
        this.recordingService = recordingService;
    }
    getRecording(params, res) {
        return this.recordingService.getRecording(params, res);
    }
};
__decorate([
    (0, common_1.Get)('/:generalName/:url/:date'),
    (0, common_1.Render)('recording'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RecordingController.prototype, "getRecording", null);
RecordingController = __decorate([
    (0, common_1.Controller)('recording'),
    __metadata("design:paramtypes", [recording_service_1.RecordingService])
], RecordingController);
exports.RecordingController = RecordingController;
//# sourceMappingURL=recording.controller.js.map