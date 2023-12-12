"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBadges = void 0;
function filterBadges(badges, maxBadgesCount) {
    return badges.filter(badge => +Object.values(badge)[0] < maxBadgesCount).map(badge => Object.keys(badge)[0]);
}
exports.filterBadges = filterBadges;
//# sourceMappingURL=badges_level.js.map