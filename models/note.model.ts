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
    tags: {
        type: Array,
        default: []
    },
    date: {
        type: String,
        required: true
    }
})

export interface Note {
    text: string,
    url: string,
    tags: string[]
}