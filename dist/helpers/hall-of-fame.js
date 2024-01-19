"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateUserWithMostBadges = void 0;
const calculateUserWithMostBadges = users => {
    const badgeNames = ['Fun', 'Encourage', 'BeeBrief', 'ZenEnviroment', 'OnTime', 'Help', 'BePresent'];
    let result = [];
    badgeNames.forEach(badgeName => {
        let maxCount = 0;
        let maxUser = {};
        users.forEach(user => {
            const count = user.badges[badgeName].count;
            if (count > maxCount) {
                maxUser = { name: user.name, count, badge: badgeName };
                maxCount = count;
            }
        });
        result.push(maxUser);
    });
    return result;
};
exports.calculateUserWithMostBadges = calculateUserWithMostBadges;
//# sourceMappingURL=hall-of-fame.js.map