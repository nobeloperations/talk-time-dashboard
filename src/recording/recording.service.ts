import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { google } from 'googleapis';
import { getAccessToken } from '../../helpers/access_token.js';
import * as dotenv from 'dotenv';
dotenv.config();

const {
    DRIVE_CLIENT_ID,
    DRIVE_CLIENT_SECRET,
    DRIVE_REDIRECT_URI,
    DRIVE_REFRESH_TOKEN,
    REFRESH_TOKEN,
    CLIENT_ID,
    CLIENT_SECRET,
    MAIL_AUTHOR,
} = process.env;

function getMessageSubject(messageData) {
    const headers = messageData.payload.headers;
    const subjectHeader = headers.find(
        (header) => header.name.toLowerCase() === 'subject'
    );
    return subjectHeader ? subjectHeader.value : 'No Subject';
}

function getMessageBody(messageData) {
    const parts = messageData.payload.parts;
    const bodyPart = parts.find((part) => part.mimeType === 'text/plain');
    return bodyPart
        ? Buffer.from(bodyPart.body.data, 'base64').toString()
        : 'No Body';
}

@Injectable()
export class RecordingService {
    async getRecording(params, res) {
        const { generalName, url, date } = params;

        try {
            const access_token = await this.getAccessToken();

            if (access_token) {
                const messages = await this.getMessages(access_token);
                const matchingMessage = await this.findMatchingMessage(
                    messages,
                    access_token,
                    generalName,
                    date
                );

                if (matchingMessage) {
                    const { message, chatId, videoId } = matchingMessage;
                    const CHAT_CONTENT = await this.getChatContent(chatId);

                    return {
                        generalName,
                        url,
                        date,
                        cssFileName: 'recording',
                        readyId: videoId,
                        chat: CHAT_CONTENT,
                    };
                }
            }
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }

        return {
            generalName,
            url,
            date,
            cssFileName: 'recording',
            readyId: '',
            chat: '',
        };
    }

    async getAccessToken() {
        return await getAccessToken(
            REFRESH_TOKEN,
            CLIENT_ID,
            CLIENT_SECRET,
            axios
        );
    }

    async getMessages(access_token) {
        const messagesResponse = await axios.get(
            `https://www.googleapis.com/gmail/v1/users/me/messages?q=from:${MAIL_AUTHOR}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return messagesResponse.data.messages;
    }

    async getMessageData(access_token, messageId) {
        const messageResponse = await axios.get(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return messageResponse.data;
    }

    async getChatContent(chatId) {
        const oauth2Client = new google.auth.OAuth2(
            DRIVE_CLIENT_ID,
            DRIVE_CLIENT_SECRET,
            DRIVE_REDIRECT_URI
        );

        oauth2Client.setCredentials({
            refresh_token: DRIVE_REFRESH_TOKEN,
        });

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        });

        const res = await drive.files.get({
            fileId: chatId,
            alt: 'media',
        });

        return res.data.toString();
    }

    async findMatchingMessage(messages, access_token, generalName, date) {
        if (messages.length === 0) {
            return null;
        }

        const message = messages.shift();
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

            return { message, chatId, videoId };
        }

        return await this.findMatchingMessage(
            messages,
            access_token,
            generalName,
            date
        );
    }
}