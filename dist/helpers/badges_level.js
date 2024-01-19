"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBadgesLevels = void 0;
const checkBadgesLevels = (badgesLevels) => {
    let levels = [];
    badgesLevels.forEach((badgesLevel) => {
        const currentLevel = badgesLevel < 3 ? 3 : badgesLevel < 5 ? 5 : badgesLevel < 10 ? 10 : 20;
        levels.push(currentLevel);
    });
    return Array.from(new Set(levels)).length === 1;
};
exports.checkBadgesLevels = checkBadgesLevels;
//# sourceMappingURL=badges_level.js.map