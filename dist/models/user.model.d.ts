import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    date: string;
    count: number;
    url: string;
    avatar: string;
    badges: any[];
    percents: string;
    generalName: string;
}>;
export interface User {
    name: string;
    url: string;
    avatar: string;
    badges: string;
    percents: string;
    generalName: string;
}
