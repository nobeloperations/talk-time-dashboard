import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { resolve } from 'path';
import { Meeting } from 'models/meeting.model';

@Injectable()
export class BadgesService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) { }

    async newBadge(params, newBadgeBodyDto) {
        try {
            const { name } = params;
            const { badge } = newBadgeBodyDto;
            await this.userModel.updateMany({ name }, { $push: { badges: {badge} } })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getFeedbackBadges(params, res) {
        try {
            const { url, name, date } = params;
            const currentUser = await this.userModel.findOne({ name, url })
            const meeting = await this.meetingModel.findOne({name: url})
            let currentMeeting = false;
            meeting.meetings.forEach(curr => {
                if(curr['date'] == date) currentMeeting = true
            })
    
            if(!currentUser || !meeting || !currentMeeting) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }
    
            let badges = await this.userModel.findOne({ name }).select('badges')
            let convertedBadges = []
            Array.from(badges.badges).forEach(o => {
                convertedBadges[o['badge']] ? convertedBadges[o['badge']] += 1 : convertedBadges[o['badge']] = 1
            })
    
            let objectBadges = Object.assign({}, convertedBadges)
            let isBadges = !!Object.keys(objectBadges).length;
    
            return { cssFileName: 'feedback-badges', badges: objectBadges, isBadges, currentUser, url, name, date }
        }
        catch(e) {
            res.sendFile(resolve('views/notfound.html'))
            return;
        }

    }
}
