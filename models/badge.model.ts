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
    },
    quizResults: {
        type: Array,
        default: [false, false, false, false, false, false, false]
    }
})

interface BadgeCount {
    count: number
}

export interface BadgeModel {
    name: string,
    badges: {
        Fun: BadgeCount,
        Encourage: BadgeCount,
        BeeBrief: BadgeCount,
        ZenEnviroment: BadgeCount,
        Help: BadgeCount,
        OnTime: BadgeCount,
        BePresent: BadgeCount
    }[],
    quizResults: boolean[]

}