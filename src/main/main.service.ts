import { Injectable } from '@nestjs/common';
import { Meeting } from '../../models/meeting.model';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

@Injectable()
export class MainService {
    constructor(@InjectModel('Meeting') private readonly meetingModel: Model<Meeting>){}

    async getMain() {
        try {
            let generals = await this.meetingModel.find()

            return {cssFileName: 'main', generals, }
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
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

}
