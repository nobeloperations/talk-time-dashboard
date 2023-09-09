import { BadgeUser } from "types/types";


export function filterUsers(dbUsers: BadgeUser[]) {

    let users = []

    for (const user of dbUsers) {
        const existingUser = users.find(u => u.name === user.name)
        if (!existingUser) users.push({ ...user._doc })
    }

    return users
}