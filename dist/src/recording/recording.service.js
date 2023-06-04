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
const refreshToken = process.env.REFRESH_TOKEN;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authorEmail = 'operations@nobelhub.com';
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
            const response = await axios_1.default.post('https://oauth2.googleapis.com/token', {
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
            });
            const { access_token } = response.data;
            if (access_token) {
                const messagesResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages?q=from:${authorEmail}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                const messages = messagesResponse.data.messages;
                for (const message of messages) {
                    const messageId = message.id;
                    const messageResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        }
                    });
                    const messageData = messageResponse.data;
                    let body = getMessageBody(messageData);
                    let subject = getMessageSubject(messageData);
                    let lowerSubject = subject.trim().toLowerCase().replaceAll(' ', '');
                    let lowerGeneralName = generalName.trim().toLowerCase().replaceAll(' ', '');
                    let dateRegex = /\((\d{4}-\d{2}-\d{2})/;
                    const meetingDate = dateRegex.exec(subject)[1];
                    if (lowerSubject.includes(lowerGeneralName) && date === meetingDate) {
                        let letter = `${subject}\n${body}`;
                        const linkRegex = /<(https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9-_]+\/view\?usp=drive_web)>/g;
                        const matches = letter.match(linkRegex);
                        const chatLink = matches[0];
                        const meetingLink = matches[1];
                        let chatId = chatLink.split('/')[5];
                        let videoId = meetingLink.split('/')[5];
                        READY_ID = videoId;
                        const { DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN } = process.env;
                        const oauth2Client = new googleapis_1.google.auth.OAuth2(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI);
                        oauth2Client.setCredentials({
                            refresh_token: DRIVE_REFRESH_TOKEN
                        });
                        const drive = googleapis_1.google.drive({
                            version: 'v3',
                            auth: oauth2Client
                        });
                        try {
                            const fileText = await drive.files.get({
                                fileId: chatId,
                                alt: 'media'
                            });
                            const fileContent = fileText.data.toString();
                            CHAT_CONTENT = fileContent;
                        }
                        catch (error) {
                            if (error.response.status === 403) {
                                console.error('Error accessing file:', error.response);
                            }
                            else {
                                console.error('Error fetching file:', error.response);
                            }
                        }
                    }
                }
            }
        }
        catch (error) {
            console.error('Error refreshing access token:', error.response);
        }
        return { generalName, url, date, cssFileName: 'recording', readyId: READY_ID, chat: CHAT_CONTENT };
    }
};
RecordingService = __decorate([
    (0, common_1.Injectable)()
], RecordingService);
exports.RecordingService = RecordingService;
//# sourceMappingURL=recording.service.js.map