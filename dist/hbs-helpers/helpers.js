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
        const parts = date.split('.');
        console.log(parts);
        return `${parts[1]}.${parts[0]}.${parts[2]}`.replaceAll('.', '/');
    },
    badgesLevel(e) {
        return e === 1 ? 'Knowlege level' : e === 2 ? 'Apprentice level' : e === 3 ? 'Mastery level' : 'Leadership level';
    },
    moreThan(str, n) {
        return str.length > n;
    }
};
//# sourceMappingURL=helpers.js.map