import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { User } from 'models/user.model';
import { Document, Model, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class DatabaseUtilsService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
                @InjectModel('Note') private readonly noteModel: Model<Note>,
                @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) {}

    async updateUserBadges(name: string, badge: string): Promise<UpdateWriteOpResult> {
        return await this.userModel.updateMany({ name }, { $push: { badges: {badge} } })
    }

    async updateUserPercents(filter: object, update: object): Promise<string | void> {
        return await this.userModel.findOneAndUpdate(filter, update)
    }

    async findUsers(filter: object, fields: string): Promise<any> {
        return await this.userModel.find(filter).select(fields)
    }

    async findUser(filter: object, fields: string): Promise<any> {
        return await this.userModel.findOne(filter).select(fields)
    }

    async updateUser(filter: object, update): Promise<UpdateWriteOpResult> {
        return await this.userModel.updateOne(filter, update)
    }

    async updateUsers(filter: object, update): Promise<UpdateWriteOpResult> {
        return await this.userModel.updateMany(filter, update)
    }

    async findFeedbacks(filter: object, fields: string): Promise<any> {
        return await this.feedbackModel.find(filter).select(fields)
    }

    async findNotes(filter: object, fields: string): Promise<any> {
        return await this.noteModel.find(filter).select(fields)
    }

    async deleteNote(filter: object): Promise<any> {
        return await this.noteModel.deleteOne(filter)
    }

    async updateNote(filter: Object, update: Object): Promise<any> {
        return await this.noteModel.updateOne(filter, update)
    }

    async findMeetingsByNameIncluding(generalNames: string[]): Promise<any> {
        return await this.meetingModel.find({name: {$in: generalNames}})
    }

    async findMeeting(filter: Object, fields: string): Promise<any> {
        return await this.meetingModel.findOne(filter).select(fields)
    }

    async updateMeetingByName(name: string, url: string, date: string): Promise<any> {
        return await this.meetingModel.updateOne({name}, {$push: { meetings: { url, date } }})
    }

    async createNewMeeting(name: string, url: string, date: string): Promise<any> {
        const newMeeting = new this.meetingModel({
            name,
            meetings: [{
                url,
                date
            }]
        })
        
        return await newMeeting.save()
    }

    async createNewFeedback(sender: string, receiver: string, feedback: string, rating: number, url: string, senderImg: string, feedbackImg: string, date: string): Promise<any> {
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

        return await newFeedback.save()
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

    async createNewUser(name: string, avatar: string, url: string, date: string, generalName: string): Promise<any> {
        const newUser = new this.userModel({
            name,
            avatar,
            url,
            percents: '',
            date,
            generalName,
            rating: 0
        })

        return await newUser.save()
    }

}
