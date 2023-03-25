import * as mongoose from 'mongoose'

export const MeetingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    meetings: {
        type: Array,
        required: true
    }
})

export interface Meeting {
    name: string,
    meetings: {}[],
}
