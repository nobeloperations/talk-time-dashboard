"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingService = void 0;
const common_1 = require("@nestjs/common");
const access_token_js_1 = require("../../helpers/access_token.js");
const dotenv = require("dotenv");
const messages_js_1 = require("../../helpers/messages.js");
const recording_setup_js_1 = require("../../helpers/recording_setup.js");
dotenv.config();
const { DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET, MAIL_AUTHOR, } = process.env;
let RecordingService = class RecordingService {
    async getRecording(params, res, generalName) {
        const { url, date } = params;
        try {
            const access_token = await (0, access_token_js_1.getAccessToken)(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET);
            if (access_token) {
                const [messages, messageId] = await (0, messages_js_1.getMessages)(MAIL_AUTHOR, generalName, date, access_token);
                if (messages) {
                    const body = await (0, messages_js_1.getMessage)(messageId, access_token);
                    const linkRegex = /<(https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9-_]+\/view\?usp=drive_web)>/g;
                    const matches = body.match(linkRegex);
                    const chatLink = matches[0];
                    const meetingLink = matches[1];
                    const chatId = chatLink.split('/')[5];
                    let READY_ID = meetingLink.split('/')[5];
                    const drive = (0, recording_setup_js_1.recordingSetup)(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN);
                    const chatResponse = await drive.files.get({
                        fileId: chatId,
                        alt: 'media',
                    });
                    return {
                        cssFileName: 'recording',
                        pageName: 'Recording',
                        generalName,
                        url,
                        date,
                        noRecording: false,
                        readyId: READY_ID,
                        chat: chatResponse.data.toString(),
                    };
                }
                return {
                    cssFileName: 'recording',
                    pageName: 'Recording',
                    generalName,
                    url,
                    date,
                    noRecording: true,
                };
            }
        }
        catch (error) {
            console.error('Error refreshing access token:', error);
        }
    }
};
RecordingService = __decorate([
    (0, common_1.Injectable)()
], RecordingService);
exports.RecordingService = RecordingService;
//# sourceMappingURL=recording.service.js.map