export declare class RecordingService {
    getRecording(params: any, res: any, generalName: any): Promise<{
        generalName: any;
        url: any;
        date: any;
        cssFileName: string;
        readyId: string;
        chat: string;
        pageName: string;
        noRecording?: undefined;
    } | {
        cssFileName: string;
        pageName: string;
        generalName: any;
        url: any;
        date: any;
        noRecording: boolean;
        readyId?: undefined;
        chat?: undefined;
    }>;
}
