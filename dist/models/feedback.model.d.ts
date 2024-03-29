import * as mongoose from 'mongoose';
export declare const FeedbackSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    sender: string;
    date: string;
    receiver: string;
    feedback: string;
    rating: number;
    url: string;
    senderImg: string;
    postDate: string;
    generalName: string;
    feedbackImg?: string;
}>;
export interface Feedback {
    sender: string;
    receiver: string;
    feedback: string;
    rating: number;
    url: string;
    senderImg: string;
    feedbackImg: string;
    date: string;
    postDate: string;
    generalName: string;
}
