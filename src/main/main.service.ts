import { Injectable } from '@nestjs/common';
import { Meeting } from '../../models/meeting.model';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from 'models/user.model';

@Injectable()
export class MainService {
    constructor(@InjectModel('Meeting') private readonly meetingModel: Model<Meeting>,
    @InjectModel('User') private readonly userModel: Model<User>){}

    async getMain(req) {
        try {
            let userPayload;
            let usersMeetings = [];
            let generalNames = []
            const cookies = req.headers.cookie.split(';');
            cookies.forEach(cookie => {
                if(cookie.startsWith('user={')) {
                    userPayload = JSON.parse(cookie.split('=').at(-1))
                }
            })
            let currentUsers = await this.userModel.find({name: userPayload.name}).select('url date generalName')
            currentUsers.forEach(currentUser => {
                usersMeetings.push({
                    url: currentUser.url,
                    date: currentUser['date']
                })
                generalNames.push(currentUser.generalName)
            })
            let generals = await this.meetingModel.find({name: {$in: generalNames}})

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
              
            return {cssFileName: 'main', generals: filteredGenerals, profileName: userPayload.name }
        }
        catch(e) {
            return { message: 'Error' }
        }
    }

    async addMeeting(addGeneralBody) {
        try {
            const { name, url, date } = addGeneralBody;
            const meeting = await this.meetingModel.findOne({name})
            if(!meeting && name !== 'Meeting Details') {
                const newMeeting = new this.meetingModel({
                    name,
                    meetings: [{
                        url,
                        date
                    }]
                })
                await newMeeting.save()
            }
            else {
                const currentMeet = await this.meetingModel.findOne({name})
                let meetPresented = currentMeet?.meetings.filter(meeting => meeting['date'] === date && meeting['url'] === url).length
                if(!meetPresented) {
                    await this.meetingModel.updateOne({name}, {$push: { meetings: { url, date } }})
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
