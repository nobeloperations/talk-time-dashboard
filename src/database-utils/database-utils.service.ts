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

    async findFeedbacksByUrlAndDate(url, date) {
        return await this.feedbackModel.find({ url, date })
    }

    async findUsersByUrlAndDate(url, date) {
        return await this.userModel.find({ url, date })

    }

    async findNotesByUrlAndDate(url, date) {
        return await this.noteModel.find({ url, date })

    }

    async updateUserPercents(name, url, date, percent) {
        await this.userModel.findOneAndUpdate({ name, url, date }, { percents: percent })
    }

    async deleteNoteById(id) {
        await this.noteModel.deleteOne({ _id: id })
    }

    async findFeedbacksByReceiverAndUrlAndDate(name, url, date) {
        return await this.feedbackModel.find({ receiver: name, url, date })
    }

    async findUserByNameAndUrlAndDate(name, url, date) {
        return await this.userModel.findOne({ name, url, date })
    }

    async findUserByName(name) {
        return await this.userModel.findOne({ name })
    }

    async findUsersAndSelectFields(filter, fields) {
        return await this.userModel.find(filter).select(fields)
    }


    async findUserAvatarByName(name) {
        return await this.userModel.findOne({ name }).select('avatar')
    }

    async findMeetingsByNameIncluding(generalNames) {
        return await this.meetingModel.find({name: {$in: generalNames}})
    }

    async findMeetingByName(name) {
        return await this.meetingModel.findOne({name})
    }

    
    async UpdateMeetingByName(name, url, date) {
        await this.meetingModel.updateOne({name}, {$push: { meetings: { url, date } }})
    }

    async findAuth(filters) {
        return await this.authModel.findOne(filters)
    }

    async updateAuthPassword(email: string, password: string): Promise<any> {
        return await this.authModel.updateOne({ email }, { password })
    }

    async deleteResetById(id) {
        await this.resetModel.deleteOne({value: id})
    }

    async findResetById(id) {
        return await this.resetModel.findOne({ value: id })
    }

    async createNewMeeting(name, url, date) {
        const newMeeting = new this.meetingModel({
            name,
            meetings: [{
                url,
                date
            }]
        })
        await newMeeting.save()
    }

    async createNewFeedback(sender, receiver, feedback, rating, url, senderImg, feedbackImg, date) {
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

    async createNewNote(url, date, text, tags) {
        const newNote = new this.noteModel({
            text,
            url,
            tags,
            date
        })

        await newNote.save()
        return JSON.stringify(newNote)
    }

    async createNewUser(name, avatar, url, date, generalName) {
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

    async createNewAuth(name, email, password) {
        const newUser = new this.authModel({ name, email, password });
        return newUser.save();
    }

    async createNewReset(id) {
        const newReset = new this.resetModel({
            value: id
        })
        newReset.save()
        return newReset
    }

}
