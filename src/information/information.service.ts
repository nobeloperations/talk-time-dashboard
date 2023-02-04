import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { General } from 'models/general.model';
import { Model } from 'mongoose';

@Injectable()
export class InformationService {

    constructor(@InjectModel('General') private readonly generalModel: Model<General>){}

    async getInformation(params) {
        const { url } = params;
        const currentMeeting = await this.generalModel.findOne({name: url})
        return { cssFileName: 'information', currentMeeting, url }
        
    }
}
