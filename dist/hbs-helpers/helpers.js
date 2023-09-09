"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpers = void 0;
exports.helpers = {
    badgeToImage(badge) {
        badge = badge.split(/(?=[A-Z])/).join('_').toLowerCase();
        return `${badge}.png`;
    },
    formatBadgeName(badge) {
        return badge.split(/(?=[A-Z])/).join(' ');
    },
    average(rate) {
        if (!rate.length)
            return 0;
        let sum = rate.reduce((a, b) => +a + +b, 0);
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
    },
    badgesExist(badges) {
        if (badges) {
            let badgesExist = false;
            let values = Object.values(badges);
            values = values.filter(value => !!value['count']);
            if (values.length)
                badgesExist = true;
            return badgesExist;
        }
    }
};
//# sourceMappingURL=helpers.js.map