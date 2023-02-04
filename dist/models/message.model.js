"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose = require("mongoose");
exports.MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=message.model.js.map