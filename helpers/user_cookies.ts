import { Request } from "express";
import { UserPayload } from "types/types";

export const getUserFromCookies = (req: Request): UserPayload | any => {
    let userPayload: UserPayload;
    if (req.headers.cookie) {
        const cookies: string[] = req.headers.cookie.split(';');
        if (cookies.length) {
            cookies.forEach((cookie: string) => {
                if (cookie.trim().startsWith('user={')) {
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