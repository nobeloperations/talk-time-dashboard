"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConclusionSchema = void 0;
const mongoose = require("mongoose");
exports.ConclusionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    important: {
        type: Boolean,
        default: false
    },
    tags: {
        type: Array,
        default: []
    },
});
//# sourceMappingURL=conclusion.model.js.map