import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { getUserFromCookies } from 'helpers/user_cookies';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { AddGeneralBody, MainReturn, UserPayload, UsersMeeting, notAuthenticated, MeetingType } from 'types/types';
import axios from 'axios'
import { calculateUsersWithMostBadges } from 'helpers/hall-of-fame';

@Injectable()
export class MainService {
    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    formatBadges(badgesObject) {
        if (badgesObject) {
            const { badges } = badgesObject;
            const formattedBadges = []
            Object.keys(badges).forEach(badge => {
                formattedBadges.push({[badge]: badges[badge].count})
            })

            return formattedBadges
        } else return []
    }

    async getMain(req: Request, res: Response): Promise<MainReturn | string | notAuthenticated | void> {
        try {
            let userPayload: UserPayload = getUserFromCookies(req)
            if (!userPayload) return { cssFileName: 'main', isAuth: false }
            let usersMeetings: UsersMeeting[] = [];
            let generalNames: string[] = []
            let currentUsers: User[] = await this.databaseUtilsService.findUsers({ name: userPayload.name }, "url date generalName")
            currentUsers.forEach(({ url, date, generalName }: User) => {
                usersMeetings.push({
                    url,
                    date
                })
                generalNames.push(generalName)
            })

            let generals: Meeting[] = await this.databaseUtilsService.findMeetingsByNameIncluding(generalNames)
            let currentUser = await this.databaseUtilsService.findUser({ name: userPayload.name }, '')
            let badges = await this.databaseUtilsService.findBadgeUserByName({ name: currentUser.name })

            const badgesSent = currentUser?.badgesSent;
            const formattedBadges = this.formatBadges(badges)

            formattedBadges.forEach(formattedBadge => {
                const numberOfBadges: any = Object.values(formattedBadge)[0];
                const badgeLevel = numberOfBadges < 3 ? 3 : numberOfBadges < 5 ? 5 : numberOfBadges < 10 ? 10 : 20;

                formattedBadge.badgesSentDiff = Math.max(badgeLevel - badgesSent, 0);
                formattedBadge.badgesReceivedDiff = Math.max(badgeLevel - numberOfBadges, 0);

                if (numberOfBadges < 3 || badgesSent < 3) {
                    formattedBadge.level = 'Knowledge';
                } else if (numberOfBadges < 5 || badgesSent < 5) {
                    formattedBadge.level = 'Apprentice';
                } else if (numberOfBadges < 10 || badgesSent < 10) {
                    formattedBadge.level = 'Mastery';
                } else {
                    formattedBadge.level = "Leadership"
                }
            });


            const filteredGenerals = generals.map((general: Meeting) => {
                const filteredMeetings: MeetingType[] = [];

                for (const meeting of general.meetings) {
                    usersMeetings.forEach((userMeeting: UsersMeeting) => {
                        if (userMeeting.url == meeting['url'] && userMeeting.date == meeting['date']) {
                            filteredMeetings.push(meeting);
                        }
                    })
                }
                return { ...general, meetings: filteredMeetings };
            });


            return { cssFileName: 'main', generals: filteredGenerals, badges: formattedBadges, title: "Main", profileName: userPayload.name, isAuth: true, badgesSent }
        }
        catch (e) {
            return res.status(404).render('notfound')
        }
    }

    async addMeeting(addGeneralBody: AddGeneralBody): Promise<void | string> {
        try {
            const { name, url, date }: AddGeneralBody = addGeneralBody;
            const meeting: Meeting = await this.databaseUtilsService.findMeeting({ name }, '')
            if (!meeting && name !== 'Meeting Details') return await this.databaseUtilsService.createNewMeeting(name, url, date)
            let meetPresented: number = meeting?.meetings.filter(meeting => meeting['date'] === date && meeting['url'] === url).length
            if (!meetPresented) return await this.databaseUtilsService.updateMeetingByName(name, url, date)
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getFAQ(req: Request) {
        try {
            let userPayload: UserPayload = getUserFromCookies(req)
            if (!userPayload) return { cssFileName: 'main', isAuth: false }
            return { cssFileName: 'faq', title: "FAQ", isAuth: true, profileName: userPayload.name }
        } catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async validateGoogleMeetLink(req: Request) {
        const { code } = req.params;
        const meeting = await axios.get(`http://52.57.170.54:5000/api/class-events/link/${code}`)

        return meeting ? JSON.stringify(meeting.data) : meeting
    }

    async getHallOfFame(req: Request, res: Response, generalName: string): Promise<any> {
        const { url, date } = req.params;
        const userPayload: UserPayload = getUserFromCookies(req)
        if (!userPayload) return res.redirect('/')

        const badgesUsers: any = await this.databaseUtilsService.findAllBadgesUsers();
        const topUsers = calculateUsersWithMostBadges(badgesUsers)

        return { cssFileName: 'hall-of-fame', title: 'Hall of Fame', isAuth: true, url, date, generalName, profileName: userPayload.name, topUsers }
    }

    async getMeetingStartTime(req: Request, res: Response, generalName: string) {
        const { url, date } = req.params;
        const now: any = new Date();
        let meetingStartTime;

        const { meetings } = await this.databaseUtilsService.findMeeting({ name: generalName }, 'meetings');

        meetings.forEach(meeting => {
            if (meeting.url === url && meeting.date === date) meetingStartTime = new Date(meeting.startTime)
        })
        const diffInDates = Math.abs(now - meetingStartTime);
        const diffInHours = diffInDates / (1000 * 60 * 60);

        return res.status(200).json({ diffInHours }).end()
    }
}