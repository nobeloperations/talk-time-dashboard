import * as mongoose from 'mongoose'

export const FeedbackSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    senderImg: {
        type: String,
        required: true
    },
    feedbackImg: {
        type: String
    },
    postDate: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    generalName: {
        type: String,
        required: true
    }
})

export interface Feedback {
    sender: string,
    receiver: string,
    feedback: string,
    rating: number,
    url: string,
    senderImg: string,
    feedbackImg: string,
    date: string,
    postDate: string,
    generalName: string
}