import { RecordingService } from './recording.service';
import { Response } from 'express';
export declare class RecordingController {
    private recordingService;
    constructor(recordingService: RecordingService);
    getRecording(params: Object, res: Response, generalName: String): Promise<{
        cssFileName: string;
        pageName: string;
        generalName: any;
        url: any;
        date: any;
        noRecording: boolean;
        readyId: string;
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
