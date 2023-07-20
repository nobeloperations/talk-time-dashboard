"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetSchema = void 0;
const mongoose = require("mongoose");
exports.ResetSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=reset.model.js.map