import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class BadgesService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async newBadge(params, newBadgeBody) {
        try {
            const { name } = params;
            const { badge } = newBadgeBody;
            await this.userModel.updateMany({ name }, { $push: { badges: {badge} } })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }
}
