import { AudioService } from './audio.service';
export declare class AudioController {
    private audioService;
    constructor(audioService: AudioService);
    getVad(params: any): {
        cssFileName: string;
        name: any;
        url: any;
        date: any;
    };
    postPeaks(params: any, postPeaksBodyDto: any): Promise<void>;
}
