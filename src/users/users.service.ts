import { HttpException, Injectable } from '@nestjs/common';
import { filterUsers } from 'helpers/badges_filter';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Badge, BadgeUser, FilteredUser, GetUserAvatarParams, GetUsersParams, GetUsersReturn, NewUserBody, NewUserParams, UserPayload } from 'types/types';
import { Response , Request } from 'express'
import { User } from 'models/user.model';
import { Meeting } from 'models/meeting.model';

@Injectable()
export class UserService {
    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getUsersAvatar(params: GetUserAvatarParams): Promise<{avatar: string}> {
        const { name }: GetUserAvatarParams = params;
        let avatar: User = await this.databaseUtilsService.findUser({name}, 'avatar');
        return avatar
    }

    async newUser(params: NewUserParams, newUserBody: NewUserBody, headers: Object): Promise<void | string> {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url }: NewUserParams = params;
                const { name, avatar, date, generalName }: NewUserBody = newUserBody;

                const isUserExsist: User = await this.databaseUtilsService.findUser({ name, url, date }, '' )
                if (!isUserExsist) return await this.databaseUtilsService.createNewUser(name, avatar, url, date, generalName)

                const badgeUser: any = await this.databaseUtilsService.findBadgeUserByName({name})
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
            const userPayload: UserPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            const { url, date }: GetUsersParams = params;
            let meeting: Meeting = await this.databaseUtilsService.findMeeting({name: generalName}, '')

            const currentMeeting: boolean = meeting?.meetings.some(curr => curr['date'] == date);

            if (!meeting || !currentMeeting) return res.status(404).render('notfound')

            const dbUsers: BadgeUser[] = await this.databaseUtilsService.findUsers({}, 'name avatar')
            const badgeUsers = await this.databaseUtilsService.findAllBadgesUsers()
            let users = filterUsers(dbUsers)

            users.forEach((user: {badges: {}, name: string}) => {
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

