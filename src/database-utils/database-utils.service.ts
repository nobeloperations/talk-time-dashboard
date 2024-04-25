import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BadgeModel, BadgeSchema } from 'models/badge.model';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { User } from 'models/user.model';
import { Model, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class DatabaseUtilsService {

    static userModel: Model<User>;
    
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
                @InjectModel('Note') private readonly noteModel: Model<Note>,
                @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>,
                @InjectModel('Badge') private readonly BadgeModel: Model<BadgeModel>) {}

    async findBadgeUserByName(filter: { name: string }) {
        const badgeUser = await this.BadgeModel.findOne(filter)
        return badgeUser
    }

    async updateUserBadgesSent(filter: { name: string }): Promise<UpdateWriteOpResult> {
        return await this.userModel.updateMany(filter, { $inc: { badgesSent: 1 } })
    }

    async updateBadge(badge: string, name: string) {
        await this.BadgeModel.updateOne({name}, {
            $inc: {
              [`badges.${badge}.count`]: 1,
            },
          })
    }

    async findAllBadgesUsers() {
        return await this.BadgeModel.find({}).select('name badges')
    }

    async findBadgesUsersByNameIncluding(names: string[]) {
        return await this.BadgeModel.find({ name: { $in: names } })
    }

    async getCountOfBadgesUsers() {
        const count = await this.BadgeModel.countDocuments({});
        return count
    }

    async findBadgesUsersInRange(page: number, limit: number) {
        const skip = (page - 1) * limit;
        let badgeUsers: any = await this.BadgeModel.find({}).skip(skip).limit(limit);

        return badgeUsers;
    }

    async createBadgesUser(name) {
        const badge = new this.BadgeModel({
            name,
            badges: {
                Fun: { count: 0 },
                Encourage: { count: 0 },
                BeeBrief: { count: 0 },
                BePresent: { count: 0 },
                ZenEnviroment: { count: 0 },
                OnTime: { count: 0 },
                Help: { count: 0 },
            }
        })
        await badge.save()
    }

    async updateUserBadges(name: string, badge: string): Promise<UpdateWriteOpResult> {
        return await this.userModel.updateMany({ name }, { $push: { badges: {badge} } })
    }

    async updateUserPercents(filter: object, update: object): Promise<string | void> {
        return await this.userModel.findOneAndUpdate(filter, update)
    }

    async findUsersByUrlIncluded(urls: string[]): Promise<any> {
        return await this.userModel.find({ url: { $in: urls } });
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

    async findMeetingsByNameAndDateIncluding(filter: {url: string, date: string}) {
        return await this.meetingModel.findOne({ 'meetings.url': filter.url, 'meetings.date': filter.date })
    }

    async findMeeting(filter: Object, fields: string): Promise<any> {
        return await this.meetingModel.findOne(filter).select(fields)
    }

    async updateMeetingByName(name: string, url: string, date: string): Promise<any> {
        return await this.meetingModel.updateOne({name}, {$push: { meetings: { url, date, startTime: new Date().toISOString().toString() } }})
    }

    async createNewMeeting(name: string, url: string, date: string): Promise<any> {
        const newMeeting = new this.meetingModel({
            name,
            meetings: [{
                url,
                date,
                startTime: new Date().toISOString().toString()
            }]
        })
        
        return await newMeeting.save()
    }

    async createNewFeedback(sender: string, receiver: string, feedback: string, rating: number, url: string, senderImg: string, feedbackImg: string, date: string, generalName: string): Promise<any> {
        let newFeedback = new this.feedbackModel({
            sender,
            receiver,
            feedback,
            rating,
            url,
            senderImg,
            feedbackImg,
            postDate: new Date().toLocaleDateString().replaceAll('.', '/'),
            date,
            generalName
        })

        return await newFeedback.save()
    }

    async createNewNote(url: string, date: string, text: string, sender: string, generalName: string): Promise<Note> {
        const sendUser = await this.findUser({name: sender}, 'avatar')
        const newNote = new this.noteModel({
            text,
            url,
            date,
            sender,
            avatar: sendUser ? sendUser['avatar'] : 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png',
            generalName
        })

        await newNote.save()
        
        return newNote
    }

    async createNewUser(name: string, avatar: string, url: string, date: string, generalName: string): Promise<any> {

        let previousQuiz = false;
        const user: any = await this.userModel.findOne({ name });
        
        if (user) {
            const { quiz } = user;

            if (quiz) previousQuiz = true;
        }

        const newUser = new this.userModel({
            name,
            avatar,
            url,
            percents: '',
            date,
            generalName,
            rating: 0,
            badgesSent: 0,
            friendRequest: [],
            friends: [],
            quiz: previousQuiz
        })

        return await newUser.save()
    }

    async a(): Promise<any> {
        return this.userModel.updateMany({}, { $unset: {quiz: 1} })
    }

    async updateQuizResultsByIndex (index: number, name: string): Promise<any> {
        return this.BadgeModel.updateOne({ name }, { $set: { [`quizResults.${index}`]: true } })
    }

}
