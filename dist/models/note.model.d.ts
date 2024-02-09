import * as mongoose from 'mongoose';
export declare const NoteSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    sender: string;
    date: string;
    text: string;
    url: string;
    generalName: string;
    avatar: string;
}>;
export interface Note {
    text: string;
    url: string;
    tags: string[];
    date: string;
    sender: string;
    avatar: string;
    generalName: String;
}
