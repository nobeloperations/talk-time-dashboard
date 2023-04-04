import { InformationService } from './information.service';
export declare class InformationController {
    private informationService;
    constructor(informationService: InformationService);
    getBadges(params: any): Promise<{
        cssFileName: string;
        isMeetPresent: any[];
        url: any;
        date: any;
    }>;
}
