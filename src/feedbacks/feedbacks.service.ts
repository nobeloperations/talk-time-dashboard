import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { config } from '../../badge-config/config'
import { resolve } from 'path';

const DEFAULT_BADGE = 'Choose the Badge (not necessarily)'

@Injectable()
export class FeedbacksService {

    constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
        @InjectModel('User') private readonly userModel: Model<User>) { }

    async getPersonalFeedbacks(params, res, generalName) {
        try {
            const { url, name, date } = params;
            const [feedbacks, currentUser] = await Promise.all([
                await this.feedbackModel.find({ receiver: name, url, date }),
                await this.userModel.findOne({ name, url, date })
            ])


            if (!currentUser) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, pageName: `${name}'s feedbacks` }
        }

        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async getNewFeedback(params, res, generalName) {
        try {
            const { url, name, date } = params;
            const [users, currentUser] = await Promise.all([
                await this.userModel.find({ url, date }),
                await this.userModel.findOne({ name, url, date })
            ])

            if (!currentUser) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            return { cssFileName: 'new-feedback', name, currentUser, url, users, date, generalName, pageName: "Leave feedback" }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async createFeedback(files, createFeedbackBody, params, res) {
        try {
            let { sender, rating, feedback, badge } = createFeedbackBody;
            let { url, name, date, generalName } = params;
            let sendUser = await this.userModel.findOne({ name: sender })

            if (badge !== DEFAULT_BADGE) {
                let key = `${badge.toLowerCase().split(' ').join('_')}`;
                let value = config[key]
                badge = `${key}${value}.png`
                await this.userModel.updateMany({ name }, { $push: { badges: { badge } } })

            }
            let newFeedback = new this.feedbackModel({
                sender,
                receiver: name,
                feedback,
                rating,
                url,
                senderImg: sendUser.avatar,
                feedbackImg: files[0]?.filename,
                postDate: new Date().toLocaleDateString(),
                date
            })

            await newFeedback.save()
            res.redirect(`/dashboard/${url}/${date}?q=${generalName}`)
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

}
