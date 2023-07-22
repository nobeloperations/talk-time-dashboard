import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class DashboardService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getDashboard(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        url: any;
        users: any;
        notes: any;
        usersLength: any;
        feedbacksLength: any;
        feedbacksByName: {};
        date: any;
        generalName: any;
        pageName: string;
        profileName: any;
    }>;
    updatePercents(params: any, postPercentsBody: any): Promise<string>;
    newNote(params: any, createNoteBody: any): Promise<string>;
    deleteNote(deleteNoteBody: any): Promise<string>;
}
