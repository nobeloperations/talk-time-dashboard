import * as mongoose from 'mongoose';
export declare const ConclusionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    text: string;
    url: string;
    important: boolean;
    tags: any[];
}>;
export interface Conclusion {
    text: string;
    url: string;
    important: string;
    tags: string[];
}
