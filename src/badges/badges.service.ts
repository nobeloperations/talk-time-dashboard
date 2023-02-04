import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class BadgesService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async newBadge(params, newBadgeBodyDto) {
        const { name, url } = params;
        const { badge } = newBadgeBodyDto;
        await this.userModel.findOneAndUpdate({ name, url }, { $push: { badges: badge } })
    }

    async getFeedbackBadges(params) {
        const { url, name } = params;   
        const currentUser = await this.userModel.findOne({name, url})
        let user = await this.userModel.findOne({ name, url })
        let badges = {}

        user.badges.forEach(function (badgesObject) {
            badges[badgesObject['badge']] = (badges[badgesObject['badge']] || 0) + 1;
        });
        return { cssFileName: 'feedback-badges', badges, currentUser, url, name }

    }
}
