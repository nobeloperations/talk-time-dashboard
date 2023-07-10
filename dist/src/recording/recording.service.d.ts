export declare class RecordingService {
    getRecording(params: any, _: any, generalName: any): Promise<{
        cssFileName: string;
        pageName: string;
        generalName: any;
        url: any;
        date: any;
        noRecording: boolean;
        readyId: any;
        chat: string;
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
