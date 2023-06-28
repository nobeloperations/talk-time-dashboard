import { Injectable } from '@nestjs/common';
import { getAccessToken } from '../../helpers/access_token.js';
import * as dotenv from 'dotenv';
import { getMessages, getMessage } from '../../helpers/messages.js';
import { recordingSetup } from '../../helpers/recording_setup.js';
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

@Injectable()
export class RecordingService {
    async getRecording(params, _, generalName) {
        const { url, date } = params;

        try {
            const access_token = await getAccessToken(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET);

            if (access_token) {
                const [messages, messageId] = await getMessages(MAIL_AUTHOR, generalName, date, access_token)

                if (messages) {                    
                    const body = await getMessage(messageId, access_token);

                    const linkRegex = /<(https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9-_]+\/view\?usp=drive_web)>/g;
                    const matches = body.match(linkRegex);

                    const chatLink = matches[0];
                    const meetingLink = matches[1];

                    const chatId = chatLink.split('/')[5];
                    let READY_ID = meetingLink.split('/')[5];

                    const drive = recordingSetup(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN)

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
                }

            }
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }

    }

}