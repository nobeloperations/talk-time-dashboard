"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUsers = void 0;
function filterUsers(dbUsers) {
    let users = [];
    for (const user of dbUsers) {
        const existingUser = users.find(u => u.name === user.name);
        if (!existingUser)
            users.push(Object.assign({}, user._doc));
    }
    return users;
}
exports.filterUsers = filterUsers;
//# sourceMappingURL=badges_filter.js.map