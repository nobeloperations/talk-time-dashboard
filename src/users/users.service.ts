import { HttpException, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';

@Injectable()
export class UserService {
    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getUsersAvatar(params) {
        const { name } = params;
        let avatar = await this.databaseUtilsService.findUserAvatarByName(name);
        return avatar
    }

    async newUser(params, newUserBody, headers) {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date, generalName } = newUserBody;

                const isUserExsist = await this.databaseUtilsService.findUserByNameAndUrlAndDate( name, url, date )
                if (!isUserExsist) {
                    await this.databaseUtilsService.createNewUser(name, avatar, url, date, generalName)
                }
            }
            else {
                throw new HttpException('Invalid headers', 404)
            }
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getUsers(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            const { url, date } = params;
            let meeting = await this.databaseUtilsService.findMeetingByName(generalName)

            const currentMeeting = meeting?.meetings.some(curr => curr['date'] == date);

            if (!meeting || !currentMeeting) {
                res.sendFile(resolve('views/notfound.html'))
            }

            const dbUsers = await this.databaseUtilsService.findUsersAndSelectFields({}, 'name avatar count badges')
            let users = []

            for (const user of dbUsers) {
                const existingUser = users.find(u => u.name === user.name)
                if (!existingUser) {
                    users.push(user.toObject())
                }
            }

            users = users.map(user => {
                const uniqueBadges = [];
                const badgeCounts = {};

                user.badges.forEach(badge => {
                    const badgeName = badge.badge;
                    if (!uniqueBadges.includes(badgeName)) {
                        uniqueBadges.push(badgeName);
                    }
                    if (!badgeCounts[badgeName]) {
                        badgeCounts[badgeName] = 0;
                    }
                    badgeCounts[badgeName]++;
                });

                const updatedBadges = uniqueBadges.map(badgeName => ({
                    badge: badgeName,
                    count: badgeCounts[badgeName]
                }));

                return { ...user, badges: updatedBadges };
            });


            return { cssFileName: 'users', users, url, date, generalName, pageName: 'Users', profileName: userPayload.name }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }
}
