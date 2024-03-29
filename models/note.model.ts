import * as mongoose from 'mongoose'

export const NoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    generalName: {
        type: String,
        required: true
    }
})

export interface Note {
    text: string,
    url: string,
    tags: string[],
    date: string,
    sender: string,
    avatar: string,
    generalName: String
}