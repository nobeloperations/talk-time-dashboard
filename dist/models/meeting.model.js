"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingSchema = void 0;
const mongoose = require("mongoose");
exports.MeetingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    meetings: {
        type: Array,
        required: true
    }
});
//# sourceMappingURL=meeting.model.js.map