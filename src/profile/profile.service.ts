import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
        @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) { }

    async getProfile(params, res, generalName) {
        try {
            const { name } = params;
            const [nameAndAvatar, currentUsers, feedbacksReceived, feedbacksSent, currentUser] = await Promise.all([
                await this.userModel.findOne({ name }).select('name avatar'),
                await this.userModel.find({ name }),
                await this.feedbackModel.find({ receiver: name }),
                await this.feedbackModel.find({ sender: name }),
                await this.userModel.findOne({ name })
            ])

            if (!currentUsers.length) {
                return res.status(404).render('notfound')
            }

            const avgRating = feedbacksReceived.length
                ? Math.floor(
                    feedbacksReceived.reduce((total, feedback) => total + feedback.rating, 0) / feedbacksReceived.length
                )
                : undefined;


            const usersBadges = {};

            for (const item of currentUser.badges) {
                const key = item['badge'];
                usersBadges[key] = usersBadges[key] ? usersBadges[key] + 1 : 1;
            }


            let meetingUrls = Array.from(new Set(currentUsers.map(currentUser => currentUser.url)))
            let meetingDates = Array.from(new Set(currentUsers.map(currentUser => currentUser['date'])))
            let meetings = []

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
