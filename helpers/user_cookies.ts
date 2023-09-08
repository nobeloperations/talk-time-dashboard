import { Request } from "express";

export const getUserFromCookies = (req: Request): any => {
    let userPayload: any;
    if (req.headers.cookie) {
        const cookies: string[] = req.headers.cookie.split(';');
        if (cookies.length) {
            cookies.forEach((cookie: string) => {
                if (cookie.startsWith('user={')) {
                    const index: number = cookie.indexOf('=')
                    userPayload = JSON.parse(cookie.substring(index + 1))
                }
            })
        }
        else {
            return 'no user'
        }
        return userPayload
    }
}
