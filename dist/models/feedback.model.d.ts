import * as mongoose from 'mongoose';
export declare const FeedbackSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    sender: string;
    date: string;
    receiver: string;
    feedback: string;
    rating: number;
    url: string;
    senderImg: string;
    comments: any[];
    file?: string;
    feedbackImg?: string;
}>;
export interface Feedback {
    sender: string;
    receiver: string;
    feedback: string;
    rating: number;
    url: string;
    file: string;
    senderImg: string;
    feedbackImg: string;
    date: string;
    comments: string[];
}
