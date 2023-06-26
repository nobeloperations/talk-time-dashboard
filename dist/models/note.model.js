"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
const mongoose = require("mongoose");
exports.NoteSchema = new mongoose.Schema({
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
    date: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=note.model.js.map