import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseUtilsService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
                @InjectModel('Note') private readonly noteModel: Model<Note>,
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

    async updateUser(filter: object, update) {
        await this.userModel.updateOne(filter, update)
    }

    async updateUsers(filter: object, update) {
        await this.userModel.updateMany(filter, update)
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

    async updateNote(filter, update) {
        await this.noteModel.updateOne(filter, update)
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
            postDate: new Date().toLocaleDateString().replaceAll('.', '/'),
            date
        })

        await newFeedback.save()
    }

    async createNewNote(url: string, date: string, text: string, tags: string[], sender: string): Promise<string> {
        const sendUser = await this.findUser({name: sender}, 'avatar')
        const newNote = new this.noteModel({
            text,
            url,
            tags,
            date,
            sender,
            avatar: sendUser ? sendUser['avatar'] : 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'
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
            generalName,
            rating: 0
        })

        await newUser.save()
    }

}
