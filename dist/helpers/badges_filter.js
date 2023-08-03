"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBadges = void 0;
function filterBadges(dbUsers) {
    let users = [];
    for (const user of dbUsers) {
        const existingUser = users.find(u => u.name === user.name);
        if (!existingUser)
            users.push(user.toObject());
    }
    users = users.map(user => {
        const uniqueBadges = [];
        const badgeCounts = {};
        user.badges.forEach(badge => {
            const badgeName = badge.badge;
            if (!uniqueBadges.includes(badgeName))
                uniqueBadges.push(badgeName);
            if (!badgeCounts[badgeName])
                badgeCounts[badgeName] = 0;
            badgeCounts[badgeName]++;
        });
        const updatedBadges = uniqueBadges.map(badgeName => ({
            badge: badgeName,
            count: badgeCounts[badgeName]
        }));
        return Object.assign(Object.assign({}, user), { badges: updatedBadges });
    });
    return users;
}
exports.filterBadges = filterBadges;
//# sourceMappingURL=badges_filter.js.map