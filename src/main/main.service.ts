import { Injectable } from '@nestjs/common';
import { General } from 'models/general.model';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

@Injectable()
export class MainService {
    constructor(@InjectModel('General') private readonly generalModel: Model<General>){}

    async getMain() {
        const generals = await this.generalModel.find()
        return {message: 'hello', cssFileName: 'main', generals}
    }

    async getSearchlist(params) {
        const { url } = params;
        const generals = await this.generalModel.find({name: url})
        return { generals, cssFileName: 'searchlist' }
    }

    async addGeneral(addGeneralBodyDto) {
        const { name, meetingObject } = addGeneralBodyDto;
        const general = await this.generalModel.findOne({ name })
        if(!general) {
            const newGeneral = new this.generalModel({
                name, 
                meetings: [meetingObject],
            })
            await newGeneral.save()
            return;
        }
        await this.generalModel.updateOne({name}, { $addToSet: { meetings: meetingObject } })
    }

}
