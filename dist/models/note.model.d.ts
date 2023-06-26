import * as mongoose from 'mongoose';
export declare const NoteSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: string;
    text: string;
    url: string;
    important: boolean;
    tags: any[];
}>;
export interface Note {
    text: string;
    url: string;
    important: string;
    tags: string[];
}