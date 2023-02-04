"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralSchema = void 0;
const mongoose = require("mongoose");
exports.GeneralSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meetings: {
        type: Array,
        required: true
    },
});
//# sourceMappingURL=general.model.js.map