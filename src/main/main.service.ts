import { Injectable } from '@nestjs/common';
import { Meeting } from '../../models/meeting.model';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { resolve } from 'path';
import { User } from 'models/user.model';

@Injectable()
export class MainService {
    constructor(@InjectModel('Meeting') private readonly meetingModel: Model<Meeting>,
                @InjectModel('User') private readonly userModel: Model<User>){}

    getWelcome() {
        return {cssFileName: 'welcome'}
    }

    async getMain() {
        try {
            let meetings = await this.meetingModel.find()

            return {cssFileName: 'main', meetings}
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getSearchlist(params, res) {
        try {
            const { url } = params;
            const meetingsResult = await this.meetingModel.find({name: url})
            if(!meetingsResult.length) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }
            return { meetingsResult, cssFileName: 'searchlist' }
        }
        catch(e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async addMeeting(addGeneralBodyDto) {
        try {
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
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

}
