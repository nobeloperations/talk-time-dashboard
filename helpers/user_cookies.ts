export const getUserFromCookies = (req) => {
    let userPayload;
    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(';');
        if (cookies.length) {
            cookies.forEach(cookie => {
                if (cookie.startsWith('user={')) {
                    userPayload = JSON.parse(cookie.split('=').at(-1))
                }
            })
        }
        else {
            return 'no user'
        }
    }

    return userPayload
}