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
    mult(e, coef) {
        return e * coef;
    },
    formatDate(date) {
        const parts = date.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${month}/${day}/${year}`;
    },
    badgesLevel(e) {
        return e === 1 ? 'Knowlege level' : e === 2 ? 'Apprentice level' : e === 3 ? 'Mastery level' : 'Leadership level';
    },
    moreThan(str, n) {
        return str.length > n;
    }
};
//# sourceMappingURL=helpers.js.map