import { DashboardService } from './dashboard.service';
import { Request, Response } from 'express';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(params: Object, res: Response, generalName: string, req: Request): Promise<any>;
    postPercents(params: Object, updatePercentsBody: Object): Promise<string>;
    newConclusion(params: Object, createNoteBody: Object): Promise<string>;
    deleteNote(deleteNoteBody: Object): Promise<string>;
}
