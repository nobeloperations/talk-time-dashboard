export declare class RecordingService {
    getRecording(params: any, res: any): Promise<{
        generalName: any;
        url: any;
        date: any;
        cssFileName: string;
        readyId: any;
        chat: string;
    }>;
    getAccessToken(): Promise<any>;
    getMessages(access_token: any): Promise<any>;
    getMessageData(access_token: any, messageId: any): Promise<any>;
    getChatContent(chatId: any): Promise<string>;
    findMatchingMessage(messages: any, access_token: any, generalName: any, date: any): any;
}
