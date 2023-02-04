import * as mongoose from 'mongoose';
export declare const GeneralSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    meetings: any[];
}>;
export interface meetingObject {
    url: string;
    date: string;
}
export interface General {
    name: string;
    meetings: {}[];
}
