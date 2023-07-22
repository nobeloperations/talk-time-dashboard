import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'models/auth.model';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { Reset } from 'models/reset.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseUtilsService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Auth') private readonly authModel: Model<Auth>,
                @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
                @InjectModel('Note') private readonly noteModel: Model<Note>,
                @InjectModel('Reset') private readonly resetModel: Model<Reset>,
                @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) {}

    async updateUserBadges(name: string, badge: string) {
        await this.userModel.updateMany({ name }, { $push: { badges: {badge} } })
    }

    async updateUserPercents(name: string, url: string, date: string, percent: string) {
        await this.userModel.findOneAndUpdate({ name, url, date }, { percents: percent })
    }

    async findUsers(filter: object, fields: string): Promise<any> {
        return await this.userModel.find(filter).select(fields)
    }

    async findUser(filter: object, fields: string): Promise<any> {
        return await this.userModel.findOne(filter).select(fields)
    }

    async findFeedbacks(filter: object, fields: string): Promise<any> {
        return await this.feedbackModel.find(filter).select(fields)
    }

    async findNotes(filter: object, fields: string): Promise<any> {
        return await this.noteModel.find(filter).select(fields)
    }

    async deleteNote(filter: object) {
        await this.noteModel.deleteOne(filter)
    }

    async findMeetingsByNameIncluding(generalNames: string[]): Promise<any> {
        return await this.meetingModel.find({name: {$in: generalNames}})
    }

    async findMeeting(filter: object, fields: string): Promise<any> {
        return await this.meetingModel.findOne(filter).select(fields)
    }

    async updateMeetingByName(name: string, url: string, date: string) {
        await this.meetingModel.updateOne({name}, {$push: { meetings: { url, date } }})
    }

    async findAuth(filters, fields: string): Promise<any> {
        return await this.authModel.findOne(filters).select(fields)
    }

    async updateAuthPassword(email: string, password: string): Promise<any> {
        await this.authModel.updateOne({ email }, { password })
    }

    async deleteResetById(id: string) {
        await this.resetModel.deleteOne({value: id})
    }

    async findReset(filter: object, fields: string): Promise<any> {
        return await this.resetModel.findOne(filter).select(fields)
    }

    async createNewMeeting(name: string, url: string, date: string) {
        const newMeeting = new this.meetingModel({
            name,
            meetings: [{
                url,
                date
            }]
        })
        
        await newMeeting.save()
    }

    async createNewFeedback(sender: string, receiver: string, feedback: string, rating: number, url: string, senderImg: string, feedbackImg: string, date: string) {
        let newFeedback = new this.feedbackModel({
            sender,
            receiver,
            feedback,
            rating,
            url,
            senderImg,
            feedbackImg,
            postDate: new Date().toLocaleDateString(),
            date
        })

        await newFeedback.save()
    }

    async createNewNote(url: string, date: string, text: string, tags: string[]): Promise<string> {
        const newNote = new this.noteModel({
            text,
            url,
            tags,
            date
        })

        await newNote.save()
        return JSON.stringify(newNote)
    }

    async createNewUser(name: string, avatar: string, url: string, date: string, generalName: string) {
        const newUser = new this.userModel({
            name,
            avatar,
            url,
            percents: '',
            date,
            generalName
        })

        await newUser.save()
    }

    async createNewAuth(name: string, email: string, password: string) {
        const newUser = new this.authModel({ name, email, password });
        await newUser.save();
    }

    async createNewReset(id: string): Promise<any> {
        const newReset = new this.resetModel({
            value: id
        })
        await newReset.save()
        return newReset
    }

}
