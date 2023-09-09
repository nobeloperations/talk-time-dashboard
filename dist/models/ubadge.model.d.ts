import * as mongoose from 'mongoose';
export declare const BadgeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    badges?: {
        Fun?: {
            count: number;
        };
        Encourage?: {
            count: number;
        };
        BeeBrief?: {
            count: number;
        };
        ZenEnviroment?: {
            count: number;
        };
        OnTime?: {
            count: number;
        };
        Help?: {
            count: number;
        };
        BePresent?: {
            count: number;
        };
    };
}>;
