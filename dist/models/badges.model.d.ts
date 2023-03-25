import * as mongoose from 'mongoose';
export declare const BadgeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    badges: any[];
    name: string;
}>;
export interface Badge {
    badges: [];
    name: string;
}
