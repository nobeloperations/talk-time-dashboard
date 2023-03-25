import * as mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})


export interface Message {
    text: string,
    from: string,
    to: string,
    url: string
}