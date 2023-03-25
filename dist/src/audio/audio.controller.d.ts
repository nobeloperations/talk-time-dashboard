import { AudioService } from './audio.service';
import { VadDto } from './dtos/vad.dto';
export declare class AudioController {
    private audioService;
    constructor(audioService: AudioService);
    getVad(params: any): {
        cssFileName: string;
        name: any;
        url: any;
        date: any;
    };
    postPeaks(params: any, postPeaksBodyDto: VadDto): Promise<void>;
}
