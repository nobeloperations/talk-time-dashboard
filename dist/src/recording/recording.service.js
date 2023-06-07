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
const access_token_js_1 = require("../../helpers/access_token.js");
const dotenv = require("dotenv");
dotenv.config();
const { DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET, MAIL_AUTHOR } = process.env;
function getMessageSubject(messageData) {
    const headers = messageData.payload.headers;
    const subjectHeader = headers.find(header => header.name.toLowerCase() === 'subject');
    return subjectHeader ? subjectHeader.value : 'No Subject';
}
function getMessageBody(messageData) {
    const parts = messageData.payload.parts;
    const bodyPart = parts.find(part => part.mimeType === 'text/plain');
    return bodyPart ? Buffer.from(bodyPart.body.data, 'base64').toString() : 'No Body';
}
let CHAT_CONTENT = '';
let READY_ID = '';
let RecordingService = class RecordingService {
    async getRecording(params, res) {
        const { generalName, url, date } = params;
        try {
            const access_token = await this.getAccessToken();
            if (access_token) {
                const messages = await this.getMessages(access_token);
                for (const message of messages) {
                    const messageId = message.id;
                    const messageData = await this.getMessageData(access_token, messageId);
                    const body = getMessageBody(messageData);
                    const subject = getMessageSubject(messageData);
                    if (subject.includes(generalName) && subject.includes(date)) {
                        let letter = `${subject}\n${body}`;
                        const linkRegex = /<(https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9-_]+\/view\?usp=drive_web)>/g;
                        const matches = letter.match(linkRegex);
                        const chatLink = matches[0];
                        const meetingLink = matches[1];
                        const chatId = chatLink.split('/')[5];
                        const videoId = meetingLink.split('/')[5];
                        const CHAT_CONTENT = await this.getChatContent(chatId);
                        return { generalName, url, date, cssFileName: 'recording', readyId: videoId, chat: CHAT_CONTENT };
                    }
                }
            }
        }
        catch (error) {
            console.error('Error refreshing access token:', error);
        }
        return { generalName, url, date, cssFileName: 'recording', readyId: READY_ID, chat: CHAT_CONTENT };
    }
    async getAccessToken() {
        return await (0, access_token_js_1.getAccessToken)(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET, axios_1.default);
    }
    async getMessages(access_token) {
        const messagesResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages?q=from:${MAIL_AUTHOR}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return messagesResponse.data.messages;
    }
    async getMessageData(access_token, messageId) {
        const messageResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return messageResponse.data;
    }
    async getChatContent(chatId) {
        const oauth2Client = new googleapis_1.google.auth.OAuth2(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI);
        oauth2Client.setCredentials({
            refresh_token: DRIVE_REFRESH_TOKEN
        });
        const drive = googleapis_1.google.drive({
            version: 'v3',
            auth: oauth2Client
        });
        const res = await drive.files.get({
            fileId: chatId,
            alt: 'media'
        });
        return res.data.toString();
    }
};
RecordingService = __decorate([
    (0, common_1.Injectable)()
], RecordingService);
exports.RecordingService = RecordingService;
//# sourceMappingURL=recording.service.js.map