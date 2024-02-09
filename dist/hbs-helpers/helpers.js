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
    formatDate(date) {
        const parts = date.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${month}/${day}/${year}`;
    },
    moreThan(str, n) {
        return str.length > n;
    },
    badgesExist(badges) {
        if (badges) {
            let badgesExist = false;
            let values = Object.values(badges).filter(value => !!value['count']);
            if (values.length)
                badgesExist = true;
            return badgesExist;
        }
    },
    lessThan(a, b) {
        return a < b;
    },
    getKeysFromBadgesConfig(badges, index) {
        const keys = Object.keys(badges);
        return keys[index];
    },
    getValuesFromBadgesConfig(badges, index) {
        const values = Object.values(badges);
        return values[index];
    },
    getNextBadgeLevel(level) {
        return {
            'Knowlege': 'Apprentice',
            'Apprentice': 'Mastery',
        }[level];
    }
};
//# sourceMappingURL=helpers.js.map