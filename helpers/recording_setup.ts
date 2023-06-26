import { OAuth2Client } from "google-auth-library";
import { drive as driveAPI } from '@googleapis/drive';

export function recordingSetup(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_REDIRECT_URI, DRIVE_REFRESH_TOKEN) {
    const oauth2Client = new OAuth2Client(
        DRIVE_CLIENT_ID,
        DRIVE_CLIENT_SECRET,
        DRIVE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
        refresh_token: DRIVE_REFRESH_TOKEN,
    });

    const drive = driveAPI({
        version: 'v3',
        auth: oauth2Client,
    });

    return drive;
}