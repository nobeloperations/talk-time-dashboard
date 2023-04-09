import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Badge } from '../../models/badges.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class BadgesService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async newBadge(params, newBadgeBodyDto) {
        const { name } = params;
        const { badge } = newBadgeBodyDto;
        await this.userModel.updateMany({ name }, { $push: { badges: {badge} } })
    }

    async getFeedbackBadges(params) {
        const { url, name, date } = params;
        const currentUser = await this.userModel.findOne({ name, url })
        let badges = await this.userModel.findOne({ name }).select('badges')
        let convertedBadges = []
        Array.from(badges.badges).forEach(o => {
            convertedBadges[o['badge']] ? convertedBadges[o['badge']] += 1 : convertedBadges[o['badge']] = 1
        })

        let objectBadges = Object.assign({}, convertedBadges)
        let isBadges = !!Object.keys(objectBadges).length;

        return { cssFileName: 'feedback-badges', badges: objectBadges, isBadges, currentUser, url, name, date }

    }
}
