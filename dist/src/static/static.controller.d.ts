import { StaticService } from './static.service';
export declare class StaticController {
    private staticService;
    constructor(staticService: StaticService);
    getFAQ(): {
        cssFileName: string;
    };
}
