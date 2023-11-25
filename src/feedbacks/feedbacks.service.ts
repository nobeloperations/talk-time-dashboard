import { Injectable } from '@nestjs/common';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Response, Request } from 'express';
import { CreateFeedbackBody, CreateNewFeedbackParams, FeedbackImage, GetNewFeedbackParams, GetNewFeedbackReturn, GetPersonalFeedbacksParams, GetPersonalFeedbacksReturn, UserPayload } from 'types/types';
import { User } from 'models/user.model';
import { Feedback } from 'models/feedback.model';

@Injectable()
export class FeedbacksService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getPersonalFeedbacks(params: GetPersonalFeedbacksParams, res: Response, generalName: string, req: Request): Promise<GetPersonalFeedbacksReturn | void> {
        try {
            const userPayload: UserPayload = getUserFromCookies(req)
            if (!userPayload) return res.redirect('/')
            const { url, name, date }: GetPersonalFeedbacksParams = params;
            const [feedbacks, currentUser]: [Feedback[], User] = await Promise.all([
                await this.databaseUtilsService.findFeedbacks({ receiver: name, url, date }, ''),
                await this.databaseUtilsService.findUser({ name, url, date }, '')
            ])

            if (!currentUser) {
                return res.status(404).render('notfound')
            }

            return { cssFileName: 'personal-feedbacks', name, currentUser, feedbacks, url, date, generalName, profileName: userPayload.name, isAuth: true, title: `${name}'s feedbacks` }
        }

        catch (e) {
            return res.status(404).render('notfound')
        }
    }

    async getNewFeedback(params: GetNewFeedbackParams, res: Response, generalName: string, req: Request): Promise<GetNewFeedbackReturn | void> {
        try {
            const userPayload: UserPayload = getUserFromCookies(req)
            if (!userPayload) return res.redirect('/')
            const { url, receiver, date }: GetNewFeedbackParams = params;
            const currentUser: User = await this.databaseUtilsService.findUser({ receiver, url, date }, '')

            if (!currentUser) {
                return res.status(404).render('notfound')
            }

            return { cssFileName: 'new-feedback', receiver, currentUser, url, date, generalName, profileName: userPayload.name, isAuth: true, title: "New feedback" }
        }
        catch (e) {
            return res.status(404).render('notfound')
        }
    }

    async createFeedback(files: FeedbackImage[], createFeedbackBody: CreateFeedbackBody, params: CreateNewFeedbackParams, res: Response, req: Request): Promise<void | string> {
        try {
            const userPayload: UserPayload = getUserFromCookies(req)
            if (!userPayload) return res.redirect('/')
            let { rating, feedback }: CreateFeedbackBody = createFeedbackBody;
            let { url, receiver, date, generalName }: CreateNewFeedbackParams = params;
            let sendUser: User = await this.databaseUtilsService.findUser({ name: userPayload.name }, '')
            await this.databaseUtilsService.updateUser({ name: receiver, url, date }, { $push: { rating } });

            await this.databaseUtilsService.createNewFeedback(userPayload.name, receiver, feedback, rating, url, sendUser.avatar, files[0]?.filename, date)
            return res.redirect(`/dashboard/${url}/${date}?q=${generalName}`)
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

}
