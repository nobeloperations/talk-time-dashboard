import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: string;
    count: number;
    name: string;
    rating: any[];
    url: string;
    avatar: string;
    percents: string;
    generalName: string;
}>;
export interface User {
    name: string;
    url: string;
    avatar: string;
    percents: string;
    generalName: string;
    rating: string[];
    date: string;
}
