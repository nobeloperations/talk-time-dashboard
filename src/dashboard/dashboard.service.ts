import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';


@Injectable()
export class DashboardService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getDashboard(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            const { url, date } = params;
            const [ users, notes, feedbacks ] = await Promise.all([
                await this.databaseUtilsService.findUsers( {url, date}, '' ),
                await this.databaseUtilsService.findNotes( {url, date}, '' ),
                await this.databaseUtilsService.findFeedbacks( {url, date}, '' )
            ])

            if (!users.length) {
                res.sendFile(resolve('views/notfound.html'))
                return;
            }

            let feedbacksByName = {}

            users.forEach(({name, avatar, percents}) => {
                feedbacksByName[name] = {
                    name,
                    rating: [],
                    avatar,
                    percents
                }
            })


            feedbacks.forEach(({receiver, rating}) => {
                feedbacksByName[receiver].rating.push(rating)
            })

            return { cssFileName: 'dashboard', url, users, notes, usersLength: users.length, feedbacksLength: feedbacks.length, feedbacksByName, date, generalName, pageName: 'Dashboard', profileName: userPayload.name }
        }
        catch (e) {
            res.sendFile(resolve('views/notfound.html'))
        }

    }

    async updatePercents(params, postPercentsBody) {
        try {
            const { percents } = postPercentsBody
            const { url, date } = params
            percents.forEach(async ({name, percent}) => {
                await this.databaseUtilsService.updateUserPercents(name, url, date, percent)
            })
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async newNote(params, createNoteBody) {
        try {
            const { url, date } = params;
            const { text, tags } = createNoteBody
            const newNote = this.databaseUtilsService.createNewNote(url, date, text, tags)
            return newNote
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

    async deleteNote(deleteNoteBody) {
        try {
            const { id } = deleteNoteBody;
            await this.databaseUtilsService.deleteNote({_id: id})
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

}