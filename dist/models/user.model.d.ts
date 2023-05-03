import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: string;
    count: number;
    name: string;
    url: string;
    avatar: string;
    peaks: any[];
    badges: any[];
    percents: string;
    status: string;
    transcription?: string;
}>;
export interface User {
    name: string;
    url: string;
    avatar: string;
    badges: string;
    peaks: number[];
    percents: string;
    transcription: String;
}
