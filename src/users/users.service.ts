import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Badge } from '../../models/badges.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Badge') private readonly badgeModel: Model<Badge>) { }

    async newUser(params, newUserBodyDto, headers) {
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
            else {
                console.log('User already created')
            }
        }
        else {
            throw new HttpException('Invalid headers', 404)
        }
    }

    async getUsers(params) {
        const { url, date } = params;
        let dbUsers = await this.userModel.find({}).select('name avatar count badges')
        let users = []
        dbUsers.forEach(async user => {
            this.userModel.countDocuments({ name: user.name }, async (_, count) => {
                await this.userModel.updateMany({ name: user.name }, { count })
            })
            users.push(user.toObject())
        })

        users = users.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.name === value.name
            ))
        )
        
        return { cssFileName: 'users', users, url, date }
    }

    async updateStatus(updateStatusBodyDto) {
        const { date, name, url, status } = updateStatusBodyDto
        await this.userModel.updateOne({ name, url, date }, { status })
    }

    async getStatuses(params) {
        const { date, url } = params
        const statuses = await this.userModel.find({ date, url }).select('name status avatar')
        return JSON.stringify(statuses)
    }
}
