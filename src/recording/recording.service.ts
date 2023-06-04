import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { google } from 'googleapis'
import * as dotenv from 'dotenv'
dotenv.config()

const refreshToken = process.env.REFRESH_TOKEN;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authorEmail = 'operations@nobelhub.com';

function getMessageSubject(messageData) {
    const headers = messageData.payload.headers;
    const subjectHeader = headers.find(header => header.name.toLowerCase() === 'subject');
    return subjectHeader ? subjectHeader.value : 'No Subject';
}

// Допоміжна функція для отримання тексту листа
function getMessageBody(messageData) {
    const parts = messageData.payload.parts;
    const bodyPart = parts.find(part => part.mimeType === 'text/plain');
    return bodyPart ? Buffer.from(bodyPart.body.data, 'base64').toString() : 'No Body';
}

let CHAT_CONTENT = '';
let READY_ID = '';

@Injectable()
export class RecordingService {
    async getRecording(params, res) {
        const { generalName, url, date } = params;

        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
            });

            const { access_token } = response.data;

            if (access_token) {
                const messagesResponse = await axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages?q=from:${authorEmail}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });

                const messages = messagesResponse.data.messages;

                for (const message of messages) {
                    const messageId = message.id;

                    const messageResponse = await axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
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
                        const oauth2Client = new google.auth.OAuth2(
                            DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI
                        );

                        oauth2Client.setCredentials({
                            refresh_token: DRIVE_REFRESH_TOKEN
                        });

                        const drive = google.drive({
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
                        } catch (error) {
                            if (error.response.status === 403) {
                                console.error('Error accessing file:', error.response);
                            } else {
                                console.error('Error fetching file:', error.response);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error refreshing access token:', error.response);
        }

        return { generalName, url, date, cssFileName: 'recording', readyId: READY_ID, chat: CHAT_CONTENT };
    }
}