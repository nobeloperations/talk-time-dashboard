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
    generalName: {
        type: String,
        required: true
    },
    rating: {
        type: Array,
        required: true
    },
    badgesSent: {
        type: Number,
        required: true
    },
    friendRequests: {
        type: Array
    },
    friends: {
        type: Array
    }
})

export interface User {
    name: string,
    url: string,
    avatar: string,
    percents: string,
    generalName: string,
    rating: string[],
    date: string,
    friendRequests: string[],
    firends: string[],
}