import { Injectable } from '@nestjs/common';
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
                return res.status(404).render('notfound')
            }

            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, pageName: `${name}'s feedbacks`, profileName: userPayload.name, isAuth: true }
        }

        catch (e) {
            return res.status(404).render('notfound')
        }
    }

    async getNewFeedback(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            const { url, receiver, date } = params;
            const currentUser = await this.databaseUtilsService.findUser({receiver, url, date}, '')

            if (!currentUser) {
                return res.status(404).render('notfound')
            }

            return { cssFileName: 'new-feedback', receiver, currentUser, url, date, generalName, pageName: "Leave feedback", profileName: userPayload.name, isAuth: true }
        }
        catch (e) {
            return res.status(404).render('notfound')
        }
    }

    async createFeedback(files, createFeedbackBody, params, res, req) {
        try {
            const userPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            let { rating, feedback, badge } = createFeedbackBody;
            let { url, receiver, date, generalName } = params;
            let sendUser = await this.databaseUtilsService.findUser({name: userPayload.name}, '')
            await this.databaseUtilsService.updateUser({name: receiver, url, date}, {$push: { rating }});

            if (badge !== DEFAULT_BADGE) await this.databaseUtilsService.updateUserBadges(receiver, badge)
            await this.databaseUtilsService.createNewFeedback(userPayload.name, receiver, feedback, rating, url, sendUser.avatar, files[0]?.filename, date)
            res.redirect(`/dashboard/${url}/${date}?q=${generalName}`)
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

}
