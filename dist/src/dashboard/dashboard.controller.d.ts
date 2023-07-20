/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { DashboardService } from './dashboard.service';
import { Request, Response } from 'express';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(params: Object, res: Response, generalName: string, req: Request): Promise<{
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
    postPercents(params: Object, updatePercentsBody: Object): Promise<string>;
    newConclusion(params: Object, createNoteBody: Object): Promise<string>;
    deleteNote(deleteNoteBody: Object): Promise<string>;
}
