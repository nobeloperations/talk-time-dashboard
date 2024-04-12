"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeSchema = void 0;
const mongoose = require("mongoose");
exports.BadgeSchema = new mongoose.Schema({
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
});
//# sourceMappingURL=badge.model.js.map