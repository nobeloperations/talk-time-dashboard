"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeSchema = void 0;
const mongoose = require("mongoose");
exports.BadgeSchema = new mongoose.Schema({
    badges: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=badges.model.js.map