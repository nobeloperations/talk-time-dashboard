"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordingSetup = void 0;
const google_auth_library_1 = require("google-auth-library");
const drive_1 = require("@googleapis/drive");
function recordingSetup(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN) {
    const oauth2Client = new google_auth_library_1.OAuth2Client(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI);
    oauth2Client.setCredentials({
        refresh_token: DRIVE_REFRESH_TOKEN,
    });
    const drive = (0, drive_1.drive)({
        version: 'v3',
        auth: oauth2Client,
    });
    return drive;
}
exports.recordingSetup = recordingSetup;
//# sourceMappingURL=recording_setup.js.map