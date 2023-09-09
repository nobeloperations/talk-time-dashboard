import { HttpException, Injectable } from '@nestjs/common';
import { filterUsers } from 'helpers/badges_filter';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { GetUserAvatarParams, GetUsersParams, GetUsersReturn, NewUserBody, NewUserParams } from 'types/types';
import { Response , Request } from 'express'

@Injectable()
export class UserService {
    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getUsersAvatar(params: GetUserAvatarParams): Promise<{avatar: string}> {
        const { name } = params;
        let avatar = await this.databaseUtilsService.findUser({name}, 'avatar');
        return avatar
    }

    async newUser(params: NewUserParams, newUserBody: NewUserBody, headers: Object): Promise<void | string> {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date, generalName } = newUserBody;

                const isUserExsist = await this.databaseUtilsService.findUser({ name, url, date }, '' )
                if (!isUserExsist) return await this.databaseUtilsService.createNewUser(name, avatar, url, date, generalName)

                const badgeUser = await this.databaseUtilsService.findBadgeUserByName({name})
                if(!badgeUser) await this.databaseUtilsService.createBadgesUser(name)
            }
            else {
                throw new HttpException('Invalid headers', 404)
            }
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getUsers(params: GetUsersParams, res: Response, generalName: string, req: Request): Promise<any | void> {
        try {
            const userPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            const { url, date } = params;
            let meeting = await this.databaseUtilsService.findMeeting({name: generalName}, '')

            const currentMeeting = meeting?.meetings.some(curr => curr['date'] == date);

            if (!meeting || !currentMeeting) return res.status(404).render('notfound')

            const dbUsers = await this.databaseUtilsService.findUsers({}, 'name avatar count')
            const badgeUsers = await this.databaseUtilsService.findAllBadgeUser()
            let users = filterUsers(dbUsers)

            users.forEach(user => {
                let usersBadges = badgeUsers.find(badgeUser => user.name == badgeUser.name)
                if(usersBadges) user.badges = usersBadges.badges
            })

            return { cssFileName: 'users', users, url, date, generalName, profileName: userPayload.name, isAuth: true, title: "Users" }
        }
        catch (e) {
            return res.status(404).render('notfound')
        }
    }
}

