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
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MainService = class MainService {
    constructor(generalModel) {
        this.generalModel = generalModel;
    }
    async getMain() {
        const generals = await this.generalModel.find();
        return { message: 'hello', cssFileName: 'main', generals };
    }
    async getSearchlist(params) {
        const { url } = params;
        const generals = await this.generalModel.find({ name: url });
        return { generals, cssFileName: 'searchlist' };
    }
    async addGeneral(addGeneralBodyDto) {
        const { name, meetingObject } = addGeneralBodyDto;
        const general = await this.generalModel.findOne({ name });
        if (!general) {
            const newGeneral = new this.generalModel({
                name,
                meetings: [meetingObject],
            });
            await newGeneral.save();
            return;
        }
        await this.generalModel.updateOne({ name }, { $addToSet: { meetings: meetingObject } });
    }
};
MainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('General')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MainService);
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map