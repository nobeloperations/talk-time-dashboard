"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.getMessages = void 0;
const axios_1 = require("axios");
function getMessageBody(messageData) {
    const bodyPart = messageData.find((part) => part.mimeType === 'text/plain');
    return bodyPart
        ? Buffer.from(bodyPart.body.data, 'base64').toString()
        : 'No Body';
}
async function getMessages(MAIL_AUTHOR, generalName, date, access_token) {
    const messagesResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages`, {
        params: {
            q: `from:${MAIL_AUTHOR} AND subject:${generalName} AND subject:${date}`,
        },
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    const messages = messagesResponse.data.messages;
    return messages ? [messages, messages[0].id] : [];
}
exports.getMessages = getMessages;
async function getMessage(messageId, access_token) {
    const messageResponse = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return getMessageBody(messageResponse.data.payload.parts);
}
exports.getMessage = getMessage;
//# sourceMappingURL=messages.js.map