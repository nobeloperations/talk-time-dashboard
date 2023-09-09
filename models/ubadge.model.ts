import * as mongoose from 'mongoose'

export const BadgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    badges: {
        Fun: {
            count: {
                default: 0,
                type: Number
            },
        },
        Encourage: {
            count: {
                default: 0,
                type: Number
            },
        },
        BeeBrief: {
            count: {
                default: 0,
                type: Number
            },
        },
        ZenEnviroment: {
            count: {
                default: 0,
                type: Number
            },
        },
        OnTime: {
            count: {
                default: 0,
                type: Number
            }
        },
        Help: {
            count: {
                default: 0,
                type: Number
            }
        },
        BePresent: {
            count: {
                default: 0,
                type: Number
            }
        }
    }
})