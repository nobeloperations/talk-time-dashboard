import * as mongoose from 'mongoose';
export declare const MessageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    text: string;
    url: string;
    from: string;
    to: string;
}>;
export interface Message {
    text: string;
    from: string;
    to: string;
    url: string;
}
