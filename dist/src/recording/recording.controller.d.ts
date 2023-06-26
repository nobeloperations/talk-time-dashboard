import { RecordingService } from './recording.service';
import { Response } from 'express';
export declare class RecordingController {
    private recordingService;
    constructor(recordingService: RecordingService);
    getRecording(params: any, res: Response, generalName: any): Promise<{
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
