import { DashboardService } from './dashboard.service';
import { Request, Response } from 'express';
import { CreateNoteBody, CreateNoteParams, DeleteNoteBody, GetDashboardParams, UpdateNoteBody, UpdatePercentageBody, UpdatePercentageParams } from 'types/types';
import { Note } from 'models/note.model';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(params: GetDashboardParams, res: Response, generalName: string, req: Request): Promise<void | import("types/types").GetDashboardReturn>;
    postPercents(params: UpdatePercentageParams, updatePercentageBody: UpdatePercentageBody): Promise<void | string>;
    newNote(params: CreateNoteParams, createNoteBody: CreateNoteBody): Promise<Note | string>;
    deleteNote(deleteNoteBody: DeleteNoteBody): Promise<void | string>;
    updateNote(updateNoteBody: UpdateNoteBody): Promise<void>;
}
