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
});
//# sourceMappingURL=user.model.js.map