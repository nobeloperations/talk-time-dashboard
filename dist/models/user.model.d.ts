import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: string;
    count: number;
    name: string;
    url: string;
    avatar: string;
    badges: any[];
    percents: string;
}>;
export interface User {
    name: string;
    url: string;
    avatar: string;
    badges: string;
    percents: string;
}
