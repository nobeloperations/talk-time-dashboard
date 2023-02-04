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
    badges: {
        type: Array,
        default: []
    },
    peaks: {
        type: Array,
        default: []
    },
    percents: {
        type: String,
        default: ''
    },
    age: {
        type: String,
        default: ''
    },
    techs: {
        type: Array,
        default: []
    },
})

export interface User {
    name: string,
    url: string,
    avatar: string,
    badges: string[],
    peaks: number[],
    percents: string,
    age: string,
    techs: string[],
}