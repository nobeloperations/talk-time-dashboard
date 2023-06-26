import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { Meeting } from 'models/meeting.model';
import { resolve } from 'path';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) { }

    async getUsersAvatar(params) {
        const { name } = params;
        let avatar = await this.userModel.findOne({ name }).select('avatar');
        return avatar
    }

    async newUser(params, newUserBody, headers) {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date } = newUserBody;

                const isUserExsist = await this.userModel.findOne({ name, url, date })
                if (!isUserExsist) {
                    const newUser = new this.userModel({
                        name,
                        avatar,
                        url,
                        percents: '',
                        date
                    })

                    await newUser.save()

                }
            }
            else {
                throw new HttpException('Invalid headers', 404)
            }
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getUsers(params, res, generalName) {
        try {
            const { url, date } = params;
            let meeting = await this.meetingModel.findOne({ name: generalName })

            const currentMeeting = meeting?.meetings.some(curr => curr['date'] == date);

            if (!meeting || !currentMeeting) {
                res.sendFile(resolve('views/notfound.html'))
            }

            const dbUsers = await this.userModel.find({}).select('name avatar count badges')
            const users = []

            for (const user of dbUsers) {
                const existingUser = users.find(u => u.name === user.name)
                if (!existingUser) {
                    users.push(user.toObject())
                }
            }

            return { cssFileName: 'users', users, url, date, generalName, pageName: 'Users' }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }
}
