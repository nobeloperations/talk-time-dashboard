"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpers = void 0;
exports.helpers = {
    convert(str) {
        return str.slice(0, -5)
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    },
    average(rate) {
        if (!rate.length)
            return 0;
        let sum = rate.reduce((a, b) => a + b, 0);
        return (sum / rate.length).toFixed(1);
    },
};
//# sourceMappingURL=helplers.js.map