import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { getUserFromCookies } from 'helpers/user_cookies';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { AddGeneralBody, FilteredMeeting, MainReturn, UserPayload, UsersMeeting, notAuthenticated } from 'types/types';

@Injectable()
export class MainService {
    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

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

            const filteredGenerals = generals.map((general: Meeting) => {
                const filteredMeetings: FilteredMeeting[] = [];

                for (const meeting of general.meetings) {
                    usersMeetings.forEach((userMeeting: UsersMeeting) => {
                        if (userMeeting.url == meeting['url'] && userMeeting.date == meeting['date']) {
                            filteredMeetings.push(meeting);
                        }
                    })
                }
                return { ...general, meetings: filteredMeetings };
            });


            return { cssFileName: 'main', generals: filteredGenerals, title: "Main", profileName: userPayload.name, isAuth: true }
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
        } catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

}
