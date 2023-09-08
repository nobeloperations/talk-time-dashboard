import axios from 'axios'

export async function getAccessToken(refresh_token: string, client_id: string, client_secret: string): Promise<any> {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
        refresh_token: refresh_token,
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'refresh_token',
    });

    console.log(typeof response)

    return response.data.access_token;
}
