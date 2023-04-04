import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meeting } from '../../models/meeting.model';
import { Model } from 'mongoose';

@Injectable()
export class InformationService {

    constructor(@InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) { }

    async getInformation(params) {
        const { url, date } = params;
        const meetings = await this.meetingModel.find()
        let meets = []
        meetings.forEach(meeting => {
            meets.push(...meeting.meetings)
        })
        let isMeetPresent = meets.filter(meet => meet.url === url && meet.date === date)
        return { cssFileName: 'information', isMeetPresent, url, date }

    }
}
