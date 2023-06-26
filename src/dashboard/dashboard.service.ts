import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from '../../models/note.model';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { resolve } from 'path';


@Injectable()
export class DashboardService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Conclusion') private readonly noteModel: Model<Note>,
        @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>) { }

    async getDashboard(params, res, generalName) {
        try {
            const { url, date } = params;
            const [ users, notes, feedbacks ] = await Promise.all([
                await this.userModel.find({ url, date }),
                await this.noteModel.find({ url, date }),
                await this.feedbackModel.find({ url, date })
            ])

            if (!users.length) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            let feedbacksByName = {}

            users.forEach(({name, avatar, percents}) => {
                feedbacksByName[name] = {
                    name,
                    rating: [],
                    avatar,
                    percents
                }
            })


            feedbacks.forEach(({receiver, rating}) => {
                feedbacksByName[receiver].rating.push(rating)
            })

            return { cssFileName: 'dashboard', url, users, notes, usersLength: users.length, feedbacksLength: feedbacks.length, feedbacksByName, date, generalName, pageName: 'Dashboard' }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }

    }

    async updatePercents(params, postPercentsBody) {
        try {
            const { percents } = postPercentsBody
            const { url, date } = params
            percents.forEach(async ({name, percent}) => {
                await this.userModel.findOneAndUpdate({ name, url, date }, { percents: percent })
            })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async newNote(params, createNoteBody) {
        try {
            const { url, date } = params;
            const { text, tags } = createNoteBody
            const newNote = new this.noteModel({
                text,
                url,
                tags,
                date
            })
    
            await newNote.save()
            return JSON.stringify(newNote)
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

    async deleteConclusion(deleteConclusionBody) {
        try {
            const { id } = deleteConclusionBody;
            await this.noteModel.deleteOne({ _id: id })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

}