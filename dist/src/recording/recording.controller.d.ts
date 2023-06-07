import { RecordingService } from './recording.service';
import { Response } from 'express';
export declare class RecordingController {
    private recordingService;
    constructor(recordingService: RecordingService);
    getRecording(params: any, res: Response): Promise<{
        generalName: any;
        url: any;
        date: any;
        cssFileName: string;
        readyId: any;
        chat: string;
    }>;
}
