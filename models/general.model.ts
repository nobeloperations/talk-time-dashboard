import * as mongoose from 'mongoose'

export const GeneralSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meetings: {
        type: Array,
        required: true
    },
})

export interface meetingObject {
    url: string,
    date: string
}

export interface General {
    name: string,
    meetings: {}[],
}
