import axios from "axios";

function getMessageBody(messageData) {
    const bodyPart = messageData.find((part) => part.mimeType === 'text/plain');
    return bodyPart
        ? Buffer.from(bodyPart.body.data, 'base64').toString()
        : 'No Body';
}

export async function getMessages(MAIL_AUTHOR, generalName, date, access_token) {
    const messagesResponse = await axios.get(
        `https://www.googleapis.com/gmail/v1/users/me/messages`,
        {
            params: {
                q: `from:${MAIL_AUTHOR} AND subject:${generalName} AND subject:${date}`,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    const messages = messagesResponse.data.messages

    return messages ? [messages, messages[0].id] : [];
}

export async function getMessage(messageId , access_token) {
    const messageResponse = await axios.get(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );
    return getMessageBody(messageResponse.data.payload.parts);
}