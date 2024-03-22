"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateUsersWithMostBadges = void 0;
const calculateUsersWithMostBadges = (users) => {
    const badgeCounts = {};
    users.forEach((user) => {
        Object.entries(user.badges).forEach(([badge, { count }]) => {
            if (!badgeCounts[badge]) {
                badgeCounts[badge] = [];
            }
            badgeCounts[badge].push({ name: user.name, count });
        });
    });
    const topUsersByBadge = {};
    Object.entries(badgeCounts).forEach(([badge, users]) => {
        users.sort((a, b) => b.count - a.count);
        topUsersByBadge[badge] = users.slice(0, 10);
    });
    return topUsersByBadge;
};
exports.calculateUsersWithMostBadges = calculateUsersWithMostBadges;
//# sourceMappingURL=hall-of-fame.js.map