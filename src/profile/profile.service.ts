import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
import { resolve } from 'path';

@Injectable()
export class ProfileService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
        @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) { }

    async getProfile(params, res, generalName) {
        try {
            const { name } = params;
            const nameAndAvatar = await this.userModel.findOne({ name }).select('name avatar')
            const currentUsers = await this.userModel.find({ name })
            const feedbacksReceived = await this.feedbackModel.find({ receiver: name })
            const feedbacksSent = await this.feedbackModel.find({ sender: name })
            const currentUser = await this.userModel.findOne({ name })

            if (!currentUsers.length) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            let avgRating;
            let rating = 0;
            let ratingCounter = 0;
            if (feedbacksReceived.length) {
                feedbacksReceived.forEach(feedback => {
                    ratingCounter++
                    rating += feedback.rating
                })
                avgRating = Math.floor(rating / ratingCounter)
            }

            let meetingUrls = []
            let meetingDates = []
            let meetings = []

            const badgesResult = {};

            for (const item of currentUser.badges) {
                const key = item['badge'];
                badgesResult[key] = badgesResult[key] ? badgesResult[key] + 1 : 1;
            }

            const usersBadges = Object.entries(badgesResult).map(([key, value]) => ({ [key]: value }));


            for (let currentUser of currentUsers) {
                meetingUrls.push(currentUser['url'])
                meetingDates.push(currentUser['date'])
            }

            meetingUrls = [...new Set(meetingUrls)]
            meetingDates = [...new Set(meetingDates)]

            let meetingsByUrl = await this.meetingModel.find({ url: { $in: meetingUrls } })

            for (let meetingByUrl of meetingsByUrl) {
                meetingByUrl.meetings.forEach(meeting => {
                    if (meetingDates.includes(meeting['date'])) meetings.push(meeting)
                })
            }

            return { cssFileName: 'profile', name: nameAndAvatar.name, avatar: nameAndAvatar.avatar, avgRating, meetingsCounter: currentUsers.length, feedbacksReceived, feedbacksSent, meetings, usersBadges, generalName }

        }
        catch (e) {
            return new Error(e)
        }
    }
}
