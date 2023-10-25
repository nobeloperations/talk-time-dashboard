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
        BeeBrief?: {
            count: number;
        };
    };
}>;
interface BadgeCount {
    count: number;
}
export interface BadgeModel {
    name: string;
    badges: {
        Fun: BadgeCount;
        Encourage: BadgeCount;
        BeeBrief: BadgeCount;
        ZenEnviroment: BadgeCount;
        Help: BadgeCount;
        OnTime: BadgeCount;
        BePresent: BadgeCount;
    }[];
}
export {};
