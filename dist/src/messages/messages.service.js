"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const events_1 = require("events");
let MessageService = class MessageService {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
    }
    sendMessage(message) {
        this.eventEmitter.emit('message', JSON.stringify(message));
    }
    onMessage(callback) {
        this.eventEmitter.on('message', callback);
    }
    offMessage(callback) {
        this.eventEmitter.off('message', callback);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)()
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=messages.service.js.map