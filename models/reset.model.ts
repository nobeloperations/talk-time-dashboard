import * as mongoose from 'mongoose'

export const ResetSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})


export interface Reset {
    value: string
}