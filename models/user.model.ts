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
    }
})

interface Badge {
    badge: string;
}

export interface User {
    name: string,
    url: string,
    avatar: string,
    badges: Badge[],
    percents: string,
    generalName: string,
    rating: string[];
}