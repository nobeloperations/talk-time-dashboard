import { Note } from '../../models/note.model';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
export declare class DashboardService {
    private readonly userModel;
    private readonly noteModel;
    private readonly feedbackModel;
    constructor(userModel: Model<User>, noteModel: Model<Note>, feedbackModel: Model<Feedback>);
    getDashboard(params: any, res: any, generalName: any): Promise<{
        cssFileName: string;
        url: any;
        users: (import("mongoose").Document<unknown, any, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        notes: (import("mongoose").Document<unknown, any, Note> & Note & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        usersLength: number;
        feedbacksLength: number;
        feedbacksByName: {};
        date: any;
        generalName: any;
        pageName: string;
    }>;
    updatePercents(params: any, postPercentsBody: any): Promise<string>;
    newNote(params: any, createNoteBody: any): Promise<string>;
    deleteNote(deleteNoteBody: any): Promise<string>;
}
