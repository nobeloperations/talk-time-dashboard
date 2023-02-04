import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    url: string;
    avatar: string;
    badges: any[];
    peaks: any[];
    percents: string;
    age: string;
    techs: any[];
}>;
export interface User {
    name: string;
    url: string;
    avatar: string;
    badges: string[];
    peaks: number[];
    percents: string;
    age: string;
    techs: string[];
}
