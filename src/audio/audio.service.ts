import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class AudioService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getAudioActivity(params) {
        const { url } = params;
        const currentUsers = await this.userModel.find({ url })
        currentUsers.forEach(currentUser => {
            currentUser.peaks.forEach(peak => {
                if (!peak) peak += 1
            })
        })
        return { users: currentUsers, url, cssFileName: 'activity' }
    }

    async postPeaks(params, postPeaksBodyDto) {
        const { name, url } = params;
        const { array } = postPeaksBodyDto;
        
        this.userModel.updateOne({ name, url }, { peaks: array }, { multi: true }, function (err, nums) { })
        
    }

    getVad(params) {
        const { url, name } = params;
        return { cssFileName: 'vad', name, url }
    }
}
