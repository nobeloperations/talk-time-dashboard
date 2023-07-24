import { Injectable } from '@nestjs/common';
import { getUserFromCookies } from 'helpers/user_cookies';
import { resolve } from 'path';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';

@Injectable()
export class MainService {
    constructor(private readonly databaseUtilsService: DatabaseUtilsService){}

    async getMain(req, res) {
        try {
            let userPayload = getUserFromCookies(req)
            if(!userPayload) return {cssFileName: 'main', isAuth: false}
            let usersMeetings = [];
            let generalNames = []
            let currentUsers = await this.databaseUtilsService.findUsers({name: userPayload.name}, "url date generalName")
            currentUsers.forEach(currentUser => {
                usersMeetings.push({
                    url: currentUser.url,
                    date: currentUser['date']
                })
                generalNames.push(currentUser.generalName)
            })
            let generals = await this.databaseUtilsService.findMeetingsByNameIncluding(generalNames)

            function filterMeetings(meetings, usersMeetings) {
                return meetings.filter(
                  (meeting) =>
                    usersMeetings.some(
                      (userMeeting) => userMeeting.date === meeting.date && userMeeting.url === meeting.url
                    )
                );
              }
              
              const filteredGenerals = generals.map((general) => ({
                name: general.name,
                meetings: filterMeetings(general.meetings, usersMeetings),
              }));
              
            return {cssFileName: 'main', generals: filteredGenerals, profileName: userPayload.name, isAuth: true }
        }
        catch(e) {
            console.log(e)
            return { message: 'Error' }
        }
    }

    async addMeeting(addGeneralBody) {
        try {
            const { name, url, date } = addGeneralBody;
            const meeting = await this.databaseUtilsService.findMeeting({name}, '')
            if(!meeting && name !== 'Meeting Details') {
                await this.databaseUtilsService.createNewMeeting(name, url, date)
            }
            else {
                const currentMeet = await this.databaseUtilsService.findMeeting({name}, '')
                let meetPresented = currentMeet?.meetings.filter(meeting => meeting['date'] === date && meeting['url'] === url).length
                if(!meetPresented) {
                    await this.databaseUtilsService.updateMeetingByName(name, url, date)
                }
            }
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

    getFAQ() {
        return { cssFileName: 'faq' }
    }

}
