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
    date: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    generalName: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=note.model.js.map