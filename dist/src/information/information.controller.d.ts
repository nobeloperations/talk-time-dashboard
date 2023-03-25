import { InformationService } from './information.service';
import { UrlDto } from 'global.dto';
export declare class InformationController {
    private informationService;
    constructor(informationService: InformationService);
    getBadges(params: UrlDto): Promise<{
        cssFileName: string;
        isMeetPresent: any[];
        url: any;
        date: any;
    }>;
}
