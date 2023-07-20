import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { Meeting } from 'models/meeting.model';
import { resolve } from 'path';
import { Auth } from 'models/auth.model';
import { getUserFromCookies } from 'helpers/user_cookies';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>,
        @InjectModel('Auth') private readonly authModel: Model<Auth>) { }

    async getUsersAvatar(params) {
        const { name } = params;
        let avatar = await this.userModel.findOne({ name }).select('avatar');
        return avatar
    }

    async newUser(params, newUserBody, headers) {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date, generalName } = newUserBody;

                const isUserExsist = await this.userModel.findOne({ name, url, date })
                if (!isUserExsist) {
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
            }
            else {
                throw new HttpException('Invalid headers', 404)
            }
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getUsers(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            const { url, date } = params;
            let meeting = await this.meetingModel.findOne({ name: generalName })

            const currentMeeting = meeting?.meetings.some(curr => curr['date'] == date);

            if (!meeting || !currentMeeting) {
                res.sendFile(resolve('views/notfound.html'))
            }

            const dbUsers = await this.userModel.find({}).select('name avatar count badges')
            let users = []

            for (const user of dbUsers) {
                const existingUser = users.find(u => u.name === user.name)
                if (!existingUser) {
                    users.push(user.toObject())
                }
            }

            users = users.map(user => {
                const uniqueBadges = [];
                const badgeCounts = {};

                user.badges.forEach(badge => {
                    const badgeName = badge.badge;
                    if (!uniqueBadges.includes(badgeName)) {
                        uniqueBadges.push(badgeName);
                    }
                    if (!badgeCounts[badgeName]) {
                        badgeCounts[badgeName] = 0;
                    }
                    badgeCounts[badgeName]++;
                });

                const updatedBadges = uniqueBadges.map(badgeName => ({
                    badge: badgeName,
                    count: badgeCounts[badgeName]
                }));

                return { ...user, badges: updatedBadges };
            });


            return { cssFileName: 'users', users, url, date, generalName, pageName: 'Users', profileName: userPayload.name }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async createUser(name, email, password) {
        const newUser = new this.authModel({ name, email, password });
        return newUser.save();
    }

    async findByEmail(email){
        return this.authModel.findOne({ email }).exec();
    }

    async findByEmailAndName(user) {
        const { name, email } = user;
        const dbUser = await this.authModel.findOne({email, name})
        return dbUser
    }

    async findById(id) {
        return this.authModel.findById(id).exec();
    }

    async findByName(name) {
        return this.authModel.findOne({ name }).exec()
    }

    async updatePassword(email, password): Promise<any> {
        return this.authModel.updateOne({ email }, { password })
    }
}
