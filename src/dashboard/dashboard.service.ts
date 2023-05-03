import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conclusion } from '../../models/conclusion.model';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { resolve } from 'path';


@Injectable()
export class DashboardService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Conclusion') private readonly conclusionModel: Model<Conclusion>,
        @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>) { }

    async getDashboard(params, res) {
        try {
            const { url, date } = params;
            const users = await this.userModel.find({ url, date })
            const conclusions = await this.conclusionModel.find({ url, date })
            const feedbacks = await this.feedbackModel.find({ url, date })

            if (!users.length) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

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

            return { cssFileName: 'dashboard', url, users, conclusions, usersLength: users.length, feedbacksLength: feedbacks.length, conclusionsLength: conclusions.length, feedbacksByName, date }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }

    }

    async postPercents(params, postPercentsBodyDto) {
        try {
            const { percents } = postPercentsBodyDto
            const { url, date } = params
            percents.forEach(async percent => {
                await this.userModel.findOneAndUpdate({ name: percent.name, url, date }, { percents: percent.percent })
            })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async newConclusion(params, createConclusionBodyDto) {
        try {
            const { url, date } = params;
            const { text, tags } = createConclusionBodyDto
            const newConclusion = new this.conclusionModel({
                text,
                url,
                tags,
                date
            })
    
            await newConclusion.save()
            return JSON.stringify(newConclusion)
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

    async deleteConclusion(deleteConclusionBodyDto) {
        try {
            const { id } = deleteConclusionBodyDto;
            await this.conclusionModel.deleteOne({ _id: id })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async importantConclusion(importantConclusionBodyDto) {
        try {
            const { id } = importantConclusionBodyDto
            await this.conclusionModel.findOneAndUpdate({ _id: id }, { important: true })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }
}

//version: '3.0'
// services:
// app:
//   build: .
//   command: npm run start:prod
//   ports:
//     - "3001:3001"