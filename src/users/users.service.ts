import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async newUser(params, newUserBodyDto, headers) {
        if(headers['token'] === process.env.HEADER) {
            const { url } = params;
            const { users } = newUserBodyDto;

            if(users.length) {
                for(let i = 0; i < users.length; i++) {
                    const user = await this.userModel.findOne({ name: users[i].name, url })
                    if(!user) {
                        const newUser = new this.userModel({
                            name: users[i].name, 
                            url,
                            avatar: users[i].img,
                            badges: []
                        })

                        await newUser.save()
                    }
                }
            }
        }
        else {
            throw new HttpException('Invalid headers', 404)
        }
    }
}
