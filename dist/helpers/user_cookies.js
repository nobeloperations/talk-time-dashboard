"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromCookies = void 0;
const getUserFromCookies = (req) => {
    let userPayload;
    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(';');
        if (cookies.length) {
            cookies.forEach((cookie) => {
                if (cookie.startsWith('user={')) {
                    const index = cookie.indexOf('=');
                    userPayload = JSON.parse(cookie.substring(index + 1));
                }
            });
        }
        else {
            return 'no user';
        }
        return userPayload;
    }
};
exports.getUserFromCookies = getUserFromCookies;
//# sourceMappingURL=user_cookies.js.map