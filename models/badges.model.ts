import * as mongoose from 'mongoose'

export const BadgeSchema = new mongoose.Schema({
    badges: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        required: true
    }
})

export interface Badge {
    badges: [],
    name: string
}