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
const axios_1 = require("axios");
const googleapis_1 = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();
const { DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET, MAIL_AUTHOR, } = process.env;
const access_token = 'ya29.a0AWY7CknybWwopGw3uk_rUHmOtEHMGXXj34i9l4OcPwi7ffBP3jcVoCSA9LbfZddWqjMmQNtzHLXA1qxix16c6g1Crx4gbJyqSD8fySaUfzcoOqG1FXyxF6ZPPbyGLBJj5ZkxRXDmA4VrPm-AqssAaTYiivXXFqCHaCgYKAZYSARISFQG1tDrp61do8Z6N4s3ihRSxoHsf6w0167';
function getMessageBody(messageData) {
    const parts = messageData.payload.parts;
    const bodyPart = parts.find((part) => part.mimeType === 'text/plain');
    return bodyPart
        ? Buffer.from(bodyPart.body.data, 'base64').toString()
        : 'No Body';
}
let RecordingService = class RecordingService {
    async getRecording(params, res) {
        const { generalName, url, date } = params;
        try {
            if (access_token) {
                const messagesResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages`, {
                    params: {
                        q: `from:${MAIL_AUTHOR} AND subject:${generalName} AND subject:${date}`,
                    },
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                const messages = messagesResponse.data.messages;
                const messageId = messages[0].id;
                const messageResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                const messageData = messageResponse.data;
                const body = getMessageBody(messageData);
                const linkRegex = /<(https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9-_]+\/view\?usp=drive_web)>/g;
                const matches = body.match(linkRegex);
                const chatLink = matches[0];
                const meetingLink = matches[1];
                const chatId = chatLink.split('/')[5];
                let READY_ID = meetingLink.split('/')[5];
                const oauth2Client = new googleapis_1.google.auth.OAuth2(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI);
                oauth2Client.setCredentials({
                    refresh_token: DRIVE_REFRESH_TOKEN,
                });
                const drive = googleapis_1.google.drive({
                    version: 'v3',
                    auth: oauth2Client,
                });
                const chatResponse = await drive.files.get({
                    fileId: chatId,
                    alt: 'media',
                });
                return {
                    generalName,
                    url,
                    date,
                    cssFileName: 'recording',
                    readyId: READY_ID,
                    chat: chatResponse.data.toString(),
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