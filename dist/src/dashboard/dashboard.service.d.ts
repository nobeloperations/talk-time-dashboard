import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
export declare class DashboardService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getDashboard(params: any, res: any, generalName: any, req: any): Promise<{
        cssFileName: string;
        url: any;
        users: (import("mongoose").Document<unknown, any, import("../../models/user.model").User> & Omit<import("../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        notes: (import("mongoose").Document<unknown, any, import("../../models/note.model").Note> & Omit<import("../../models/note.model").Note & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        usersLength: number;
        feedbacksLength: number;
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
