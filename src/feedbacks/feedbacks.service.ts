import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from 'models/feedback.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
import { config } from '../../badge-config/config'

const DEFAULT_BADGE = 'Choose the Badge (not necessarily)'
const DEFAULT_TECH_BADGE = 'Select Technology'

@Injectable()
export class FeedbacksService {

    constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
                @InjectModel('User') private readonly userModel: Model<User>){}

    async getFeedbacks(params) {
        const { url } = params;
        const users = await this.userModel.find({ url })
        return { cssFileName: 'feedback', users, url }
    }


    async getPersonalFeedbacks(params) {
        const { url, name } = params;
        const feedbacks = await this.feedbackModel.find({ receiver: name, url })
        const currentUser = await this.userModel.findOne({name, url})
        return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url }
    }

    async getNewFeedback(params) {
        const { url, name } = params;
        const currentUser = await this.userModel.findOne({name, url})
        const users = await this.userModel.find({ url })
        return { cssFileName: 'new-feedback', name, currentUser, url, users }
    }

    async createFeedback(files, createFeedbackBodyDto, params, res) {
        let { sender, rating, feedback, badge, tech, level } = createFeedbackBodyDto;
        let { url, name } = params;
        let receiver = name
        let sendUser = await this.userModel.findOne({ name: sender })


        if (badge !== DEFAULT_BADGE) {            
            let key = `${badge.toLowerCase().split(' ').join('_')}`;
            let value = config[key]
            badge = `${key}${value}.png`
            await this.userModel.findOneAndUpdate({ name: receiver, url }, { $push: { badges: { badge } } })

        }

        if(level || tech) {
            if(tech !== DEFAULT_TECH_BADGE && tech !== undefined) {
                let techBadge = `${tech}${level}`
                await this.userModel.updateMany({name: receiver}, { $push: { techs: {badge: techBadge} } })
            }
        }
        let newFeedback = new this.feedbackModel({
            sender,
            receiver,
            feedback,
            rating,
            url,
            senderImg: sendUser ? sendUser.avatar : 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
            feedbackImg: files[0]?.filename,
            date: new Date().toLocaleDateString()
        })

        await newFeedback.save()
        res.redirect(`/dashboard/${url}`)
    }

}
