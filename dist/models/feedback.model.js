"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackSchema = void 0;
const mongoose = require("mongoose");
exports.FeedbackSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    senderImg: {
        type: String,
        required: true
    },
    feedbackImg: {
        type: String
    },
    postDate: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=feedback.model.js.map