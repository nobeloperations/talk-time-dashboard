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
        let avatar = await this.userModel.findOne({name}).select('avatar');
        return avatar
    }

    async newUser(params, newUserBodyDto, headers) {
        try {
            if (headers['token'] === process.env.HEADER) {
                const { url } = params;
                const { name, avatar, date } = newUserBodyDto;
    
                const isUser = await this.userModel.findOne({ name, url, date })
                if (!isUser) {
                    const newUser = new this.userModel({
                        name,
                        avatar,
                        url,
                        peaks: [],
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
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getUsers(params, res) {
        try {
            const { url, date, generalName } = params;
            let meeting = await this.meetingModel.findOne({name: generalName})
            let currentMeeting = false;
            meeting?.meetings.forEach(curr => {
                if(curr['date'] == date) currentMeeting = true
            })
            
            if(!meeting || !currentMeeting) {
                res.sendFile(resolve('views/notfound.html'))
            }
    
            let dbUsers = await this.userModel.find({}).select('name avatar count badges')
            let users = []
            dbUsers.forEach(async user => {
                users.push(user.toObject())
            })
    
            users = users.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.name === value.name
                ))
            )
            
            return { cssFileName: 'users', users, url, date, generalName, pageName: 'Users' }
        }
        catch(e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async updateStatus(updateStatusBodyDto) {
        try {
            const { date, name, url, status } = updateStatusBodyDto
            await this.userModel.updateOne({ name, url, date }, { status })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async getStatuses(params) {
        try {
            const { date, url } = params
            const statuses = await this.userModel.find({ date, url }).select('name status avatar')
            return statuses
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }
}
