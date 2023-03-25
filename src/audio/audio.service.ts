import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class AudioService {

    constructor(@InjectModel('Meeting') private readonly meetingModel: Model<Meeting>,
        @InjectModel('User') private readonly userModel: Model<User>) { }


    async postPeaks(params, postPeaksBodyDto) {
        const { name, url, date } = params;
        const { array } = postPeaksBodyDto;
        this.userModel.updateOne({ name, url, date }, { peaks: array }, { multi: true }, function (err, nums) { })

    }

    getVad(params) {

        const { url, name, date } = params;

        return { cssFileName: 'vad', name, url, date }
    }
}
