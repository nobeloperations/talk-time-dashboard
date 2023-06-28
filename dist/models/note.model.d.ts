import * as mongoose from 'mongoose';
export declare const NoteSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    text: string;
    date: string;
    url: string;
    tags: any[];
}>;
export interface Note {
    text: string;
    url: string;
    tags: string[];
}
