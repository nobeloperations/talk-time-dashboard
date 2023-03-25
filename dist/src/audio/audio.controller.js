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
exports.AudioController = void 0;
const common_1 = require("@nestjs/common");
const audio_service_1 = require("./audio.service");
const vad_dto_1 = require("./dtos/vad.dto");
let AudioController = class AudioController {
    constructor(audioService) {
        this.audioService = audioService;
    }
    getVad(params) {
        return this.audioService.getVad(params);
    }
    postPeaks(params, postPeaksBodyDto) {
        return this.audioService.postPeaks(params, postPeaksBodyDto);
    }
};
__decorate([
    (0, common_1.Get)('/vad/:url/:name/:date'),
    (0, common_1.Render)('vad'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AudioController.prototype, "getVad", null);
__decorate([
    (0, common_1.Post)('/vad/:url/:name/:date'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, vad_dto_1.VadDto]),
    __metadata("design:returntype", void 0)
], AudioController.prototype, "postPeaks", null);
AudioController = __decorate([
    (0, common_1.Controller)('audio'),
    __metadata("design:paramtypes", [audio_service_1.AudioService])
], AudioController);
exports.AudioController = AudioController;
//# sourceMappingURL=audio.controller.js.map