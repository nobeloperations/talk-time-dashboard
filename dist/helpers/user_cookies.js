"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromCookies = void 0;
const getUserFromCookies = (req) => {
    let userPayload;
    const cookies = req.headers.cookie.split(';');
    cookies.forEach(cookie => {
        if (cookie.startsWith('user={')) {
            userPayload = JSON.parse(cookie.split('=').at(-1));
        }
    });
    return userPayload;
};
exports.getUserFromCookies = getUserFromCookies;
//# sourceMappingURL=user_cookies.js.map