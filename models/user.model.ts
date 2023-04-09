import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    peaks: {
        type: Array,
        default: []
    },
    badges: {
        type: Array,
        default: []
    },
    percents: {
        type: String,
        default: ''
    },
    count: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: ''
    }
})

export interface User {
    name: string,
    url: string,
    avatar: string,
    badges: string,
    peaks: number[],
    percents: string,
}
