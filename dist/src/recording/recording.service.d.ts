export declare class RecordingService {
    getRecording(params: any, res: any): Promise<{
        generalName: any;
        url: any;
        date: any;
        cssFileName: string;
        readyId: string;
        chat: string;
    }>;
    getAccessToken(): Promise<any>;
    getMessages(access_token: any): Promise<any>;
    getMessageData(access_token: any, messageId: any): Promise<any>;
    getChatContent(chatId: any): Promise<string>;
}
