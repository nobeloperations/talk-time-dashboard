"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
async function getAccessToken(refresh_token, client_id, client_secret, axios) {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
        refresh_token: refresh_token,
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'refresh_token',
    });
    return response.data.access_token;
}
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=access_token.js.map