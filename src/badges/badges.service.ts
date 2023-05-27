import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { resolve } from 'path';
import { Meeting } from 'models/meeting.model';

@Injectable()
export class BadgesService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) { }

    async newBadge(params, newBadgeBodyDto) {
        try {
            const { name } = params;
            const { badge } = newBadgeBodyDto;
            await this.userModel.updateMany({ name }, { $push: { badges: {badge} } })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }
}
