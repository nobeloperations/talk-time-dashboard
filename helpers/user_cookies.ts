export const getUserFromCookies = (req) => {
    let userPayload;
    const cookies = req.headers.cookie.split(';');
    cookies.forEach(cookie => {
        if (cookie.startsWith('user={')) {
            userPayload = JSON.parse(cookie.split('=').at(-1))
        }
    })

    return userPayload
}