import * as mongoose from 'mongoose'
import { FilteredMeeting } from 'types/types'

export const MeetingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    meetings: Array,
})

export interface Meeting {
    name: string,
    meetings: FilteredMeeting[],
}
