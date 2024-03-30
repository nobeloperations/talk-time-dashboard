import { HttpException, Injectable } from '@nestjs/common';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { BadgeUser, GetUserAvatarParams, GetUsersParams, NewUserBody, NewUserParams, UserPayload } from 'types/types';
import { Response , Request } from 'express'
import { User } from 'models/user.model';
import mongoose from 'mongoose';

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

            return { cssFileName: 'users', url, date, generalName, profileName: userPayload.name, isAuth: true, title: "Add Friends" }
        }
        catch (e) {
            return res.status(404).render('notfound')
        }
    }

    async getUserFriendRequests(params, res: Response) {
        const { name } = params;
        const user = await this.databaseUtilsService.findUser({ name } , '');

        return res.json({friendRequests: user.friendRequests})
    }

    async getUsersInRange(page: number, limit: number, res: Response) {
        try {
            let users = await this.databaseUtilsService.findBadgesUsersInRange(page, limit);
    
            users = await Promise.all(users.map(async (user: any) => {
                const { name } = user;
                const { friendRequests } = await this.databaseUtilsService.findUser({ name }, 'friendRequests');

                return {...user._doc, friendRequests};
            }));
    
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getMeetingUsersStats(generalName: string, res: Response, req: Request) {
        const userPayload: UserPayload = getUserFromCookies(req)
        if(!userPayload) return res.redirect('/')

        const { url, date } = req.params;

        const names = new Set()
        const urls = new Set()

        const { meetings } = await this.databaseUtilsService.findMeeting({name: generalName}, '');
        
        meetings.forEach(meeting => { urls.add(meeting.url) })

        const uniqueUrls: any = Array.from(urls)
        const users = await this.databaseUtilsService.findUsersByUrlIncluded(uniqueUrls)
        
        users.forEach(user => { names.add(user.name) })
        
        const uniqueNames: any = Array.from(names);

        let badgesUsers: any = await this.databaseUtilsService.findBadgesUsersByNameIncluding(uniqueNames)

        badgesUsers = await Promise.all(badgesUsers.map(async (badgesUser: any) => {
            const totalBadges = Object.values(badgesUser.badges).reduce((acc: number, curr: any) => acc + curr.count, 0);
            const { badgesSent } = await this.databaseUtilsService.findUser({name: badgesUser.name}, 'badgesSent');
            return { ...badgesUser._doc, badgesSent, totalBadges }
        }))

        return { url, date, generalName, badgesUsers, profileName: userPayload.name, isAuth: true, title: `${generalName} participants`, cssFileName: 'meeting-stats' }
    }

    async newFriendRequest(params) {
        let { name, sender } = params;

        await this.databaseUtilsService.updateUsers({ name }, { $push: { friendRequests: sender } });
    }

    async getFriendRequests(params) {
        const { name } = params;

        const currentUser = await this.databaseUtilsService.findUser({ name }, 'friendRequests');

        return JSON.stringify({ friendRequests: currentUser.friendRequests })
    } 

    async addFriend(params) {
        const { sender, receiver } = params;

        await this.databaseUtilsService.updateUsers({ name: receiver }, { $pull: { friendRequests: sender } })

        await this.databaseUtilsService.updateUsers({ name: sender }, { $push: { friends: receiver } })

        await this.databaseUtilsService.updateUsers({ name: receiver }, { $push: { friends: sender } })
    }   

    
    async getAllFriends(params) {
        const { name } = params;

        const currentUser = await this.databaseUtilsService.findUser({ name }, '');

        const badgeUser = await this.databaseUtilsService.findBadgeUserByName({name});
        return JSON.stringify({ friends: currentUser.friends, friendRequests: currentUser.friendRequests, badges: badgeUser.badges })
    }

    async deleteFriend(params ) {
        const { receiver, sender } = params;

        await this.databaseUtilsService.updateUsers({ name: receiver }, { $pull: { friends: sender } })
        await this.databaseUtilsService.updateUsers({ name: sender }, { $pull: { friends: receiver } })

        await this.databaseUtilsService.updateUsers({ name: receiver }, { $pull: { friendRequests: sender } })
        await this.databaseUtilsService.updateUsers({ name: sender }, { $pull: { friendRequests: receiver } })
        
        return JSON.stringify({ message: "All good" })

    }
}   

