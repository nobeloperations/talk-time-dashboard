import { AudioService } from './audio.service';
export declare class AudioController {
    private audioService;
    constructor(audioService: AudioService);
    postPeaks(params: any, postPeaksBodyDto: any): Promise<string>;
}
