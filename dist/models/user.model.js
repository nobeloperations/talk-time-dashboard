"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
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
});
//# sourceMappingURL=user.model.js.map