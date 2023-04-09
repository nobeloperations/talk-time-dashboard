import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { config } from '../../badge-config/config'
import { Badge } from '../../models/badges.model';

const DEFAULT_BADGE = 'Choose the Badge (not necessarily)'

@Injectable()
export class FeedbacksService {

    constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
                @InjectModel('User') private readonly userModel: Model<User>){}

    async getFeedbacks(params) {
        const { url,date } = params;
        const users = await this.userModel.find({ url,date })
        return { cssFileName: 'feedback', users, url, date }
    }


    async getPersonalFeedbacks(params) {
        const { url, name, date } = params;
        const feedbacks = await this.feedbackModel.find({ receiver: name, url, date })
        const currentUser = await this.userModel.findOne({name, url, date})
        return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date }
    }

    async getNewFeedback(params) {
        const { url, name,date } = params;
        const currentUser = await this.userModel.findOne({name, url, date})
        const users = await this.userModel.find({ url, date })
        return { cssFileName: 'new-feedback', name, currentUser, url, users, date }
    }

    async createFeedback(files, createFeedbackBodyDto, params, res) {
        let { sender, rating, feedback, badge } = createFeedbackBodyDto;
        let { url, name, date } = params;
        let receiver = name
        let sendUser = await this.userModel.findOne({ name: sender })


        if (badge !== DEFAULT_BADGE) {            
            let key = `${badge.toLowerCase().split(' ').join('_')}`;
            let value = config[key]
            badge = `${key}${value}.png`
            await this.userModel.updateMany({ name: receiver }, { $push: { badges: { badge } } })

        }
        let newFeedback = new this.feedbackModel({
            sender,
            receiver,
            feedback,
            rating,
            url,
            senderImg: sendUser ? sendUser.avatar : 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
            feedbackImg: files[0]?.filename,
            postDate: new Date().toLocaleDateString(),
            date
        })

        await newFeedback.save()
        res.redirect(`/dashboard/${url}/${date}`)
    }

}
