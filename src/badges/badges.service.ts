import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Badge } from 'models/badges.model';
import { Message } from 'models/message.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class BadgesService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Badge') private readonly badgeModel: Model<Badge>,) { }

    async newBadge(params, newBadgeBodyDto) {
        const { name } = params;
        const { badge } = newBadgeBodyDto;
        const userBadges = await this.badgeModel.findOne({ name })
        if (userBadges) {
            await this.badgeModel.updateMany({ name }, { $push: { badges: {badge} } })
        }
        else {
            const newBadge = new this.badgeModel({
                name,
                badges: [{badge: badge}]
            })

            await newBadge.save()
        }
    }

    async getFeedbackBadges(params) {
        const { url, name, date } = params;
        const currentUser = await this.userModel.findOne({ name, url })
        let badges = await this.badgeModel.findOne({ name })
        let convertedBadges = []
        badges?.badges.forEach(o => {
            convertedBadges[o['badge']] ? convertedBadges[o['badge']] += 1 : convertedBadges[o['badge']] = 1
        })

        let objectBadges = Object.assign({}, convertedBadges)
        let isBadges = !!Object.keys(objectBadges).length;

        return { cssFileName: 'feedback-badges', badges: objectBadges, isBadges, currentUser, url, name, date }

    }
}
