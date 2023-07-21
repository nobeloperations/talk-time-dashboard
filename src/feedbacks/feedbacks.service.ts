import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { config } from '../../badge-config/config'
import { resolve } from 'path';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';

const DEFAULT_BADGE = 'Choose the Badge (not necessarily)'

@Injectable()
export class FeedbacksService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getPersonalFeedbacks(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            const { url, name, date } = params;
            const [feedbacks, currentUser] = await Promise.all([
                await this.databaseUtilsService.findFeedbacksByReceiverAndUrlAndDate( name, url, date ),
                await this.databaseUtilsService.findUserByNameAndUrlAndDate( name, url, date )
            ])


            if (!currentUser) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, pageName: `${name}'s feedbacks`, profileName: userPayload.name }
        }

        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async getNewFeedback(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            const { url, name, date } = params;
            const [users, currentUser] = await Promise.all([
                await this.databaseUtilsService.findUsersByUrlAndDate( url, date ),
                await this.databaseUtilsService.findUserByNameAndUrlAndDate( name, url, date )
            ])

            if (!currentUser) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            return { cssFileName: 'new-feedback', name, currentUser, url, users, date, generalName, pageName: "Leave feedback", profileName: userPayload.name }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async createFeedback(files, createFeedbackBody, params, res, req) {
        try {
            const userPayload = getUserFromCookies(req)
            let { rating, feedback, badge } = createFeedbackBody;
            let { url, name, date, generalName } = params;
            let sendUser = await this.databaseUtilsService.findUserByName(userPayload.name)

            if (badge !== DEFAULT_BADGE) {
                let key = `${badge.toLowerCase().split(' ').join('_')}`;
                let value = config[key]
                badge = `${key}${value}.png`
                await this.databaseUtilsService.updateUserBadges(name, badge)

            }
            await this.databaseUtilsService.createNewFeedback(userPayload.name, name, feedback, rating, url, sendUser.avatar, files[0]?.filename, date)
            res.redirect(`/dashboard/${url}/${date}?q=${generalName}`)
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

}
