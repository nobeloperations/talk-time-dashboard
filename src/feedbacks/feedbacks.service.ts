import { Injectable } from '@nestjs/common';
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
            if(!userPayload) return res.redirect('/')
            const { url, name, date } = params;
            const [feedbacks, currentUser] = await Promise.all([
                await this.databaseUtilsService.findFeedbacks({receiver: name, url, date}, '' ),
                await this.databaseUtilsService.findUser({name, url, date}, '')
            ])

            if (!currentUser) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, pageName: `${name}'s feedbacks`, profileName: userPayload.name, isAuth: true }
        }

        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async getNewFeedback(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            const { url, name, date } = params;
            const [users, currentUser] = await Promise.all([
                await this.databaseUtilsService.findUsers({ url, date}, ''),
                await this.databaseUtilsService.findUser({name, url, date}, '')
            ])

            if (!currentUser) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            return { cssFileName: 'new-feedback', name, currentUser, url, users, date, generalName, pageName: "Leave feedback", profileName: userPayload.name, isAuth: true }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async createFeedback(files, createFeedbackBody, params, res, req) {
        try {
            const userPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            let { rating, feedback, badge } = createFeedbackBody;
            let { url, name, date, generalName } = params;
            let sendUser = await this.databaseUtilsService.findUser({name: userPayload.name}, '')

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
