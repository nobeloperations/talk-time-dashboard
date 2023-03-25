import { Injectable } from '@nestjs/common';
import { Meeting } from 'models/meeting.model';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

@Injectable()
export class MainService {
    constructor(@InjectModel('Meeting') private readonly meetingModel: Model<Meeting>){}

    test(body) {
        console.log(body)
    }

    async getMain() {
        let meetings = await this.meetingModel.find()

        return {message: 'hello', cssFileName: 'main', meetings}
    }

    async getSearchlist(params) {
        const { url } = params;
        const meetingsResult = await this.meetingModel.find({name: url})
        return { meetingsResult, cssFileName: 'searchlist' }
    }

    async addMeeting(addGeneralBodyDto) {
        const { name, url, date } = addGeneralBodyDto;
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

}
