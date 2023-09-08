import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Response, Request } from 'express';
import { CreateNoteBody, CreateNoteParams, DeleteNoteBody, GetDashboardParams, GetDashboardReturn, UpdateNoteBody, UpdatePercentageBody, UpdatePercentageParams } from 'types/types';
import { Note } from 'models/note.model';
export declare class DashboardService {
    private readonly databaseUtilsService;
    constructor(databaseUtilsService: DatabaseUtilsService);
    getDashboard(params: GetDashboardParams, res: Response, generalName: string, req: Request): Promise<GetDashboardReturn | void>;
    updatePercents(params: UpdatePercentageParams, postPercentsBody: UpdatePercentageBody): Promise<void | string>;
    newNote(params: CreateNoteParams, createNoteBody: CreateNoteBody): Promise<Note | string>;
    deleteNote(deleteNoteBody: DeleteNoteBody): Promise<void | string>;
    updateNote(updateNoteBody: UpdateNoteBody): Promise<void>;
}
