import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conclusion } from 'models/conclusion.model';
import { Feedback } from 'models/feedback.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';


@Injectable()
export class DashboardService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Conclusion') private readonly conclusionModel: Model<Conclusion>,
        @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>) { }

    async getDashboard(params) {
        const { url } = params;
        const users = await this.userModel.find({ url })
        const conclusions = await this.conclusionModel.find({ url })
        const feedbacks = await this.feedbackModel.find({ url })
        let feedbacksByName = {}

        users.forEach(user => {
            feedbacksByName[user.name] = {
                name: user.name,
                rating: [],
                avatar: user.avatar,
                percents: user.percents,
                peaks: user.peaks
            }
        })
        

        feedbacks.forEach(feedback => {
            feedbacksByName[feedback.receiver].rating.push(feedback.rating)
        })

        return { cssFileName: 'dashboard', url, users, conclusions, usersLength: users.length, feedbacksLength: feedbacks.length, conclusionsLength: conclusions.length, feedbacksByName }

    }

    async postPercents(params, postPercentsBodyDto) {
        const { percents } = postPercentsBodyDto
        const { url } = params
        percents.forEach(async percent => {
            await this.userModel.findOneAndUpdate({name: percent.name, url}, {percents: percent.percent})
        })
    }

    async newConclusion(params, createConclusionBodyDto) {
        const { url } = params;
        const { text, tags } = createConclusionBodyDto
        const newConclusion = new this.conclusionModel({
            text,
            url,
            tags
        })

        await newConclusion.save()
        return JSON.stringify(newConclusion)
    }

    async deleteConclusion(deleteConclusionBodyDto) {
        const { id } = deleteConclusionBodyDto;
        await this.conclusionModel.deleteOne({_id: id})
    }

    async importantConclusion(importantConclusionBodyDto) {
        const { id } = importantConclusionBodyDto
        await this.conclusionModel.findOneAndUpdate({_id: id}, {important: true})
        await this.conclusionModel.findOneAndUpdate({_id: id}, {$inc: { importanceCount: 1 }})
    }
}
