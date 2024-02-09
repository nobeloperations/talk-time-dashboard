import * as mongoose from 'mongoose'
import { MeetingType } from 'types/types'

export const MeetingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    meetings: Array,
})

export interface Meeting {
    name: string,
    meetings: MeetingType[],
}
