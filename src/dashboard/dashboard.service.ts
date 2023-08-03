import { Injectable } from '@nestjs/common';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';


@Injectable()
export class DashboardService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getDashboard(params, res, generalName, req) {
        try {
            const userPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            const { url, date } = params;
            const [users, notes, feedbacks] = await Promise.all([
                await this.databaseUtilsService.findUsers({ url, date }, ''),
                await this.databaseUtilsService.findNotes({ url, date }, ''),
                await this.databaseUtilsService.findFeedbacks({ url, date }, '')
            ])

            if (!users.length) {
                return res.status(404).render('notfound')
            }

            return { cssFileName: 'dashboard', url, users, notes, usersLength: users.length, feedbacksLength: feedbacks.length, date, generalName, pageName: 'Dashboard', profileName: userPayload.name, isAuth: true }
        }
        catch (e) {
            return res.status(404).render('notfound')
        }

    }

    async updatePercents(params, postPercentsBody) {
        try {
            const { percents } = postPercentsBody
            const { url, date } = params
            const { name, percent } = percents
            await this.databaseUtilsService.updateUserPercents(name, url, date, percent)
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async newNote(params, createNoteBody) {
        try {
            let { url, date } = params;
            let { text, tags, sender } = createNoteBody
            if(!sender) sender = 'Talk time user'
            const newNote = this.databaseUtilsService.createNewNote(url, date, text, tags, sender)
            return newNote
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

    async deleteNote(deleteNoteBody) {
        try {
            const { id } = deleteNoteBody;
            await this.databaseUtilsService.deleteNote({ _id: id })
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async updateNote(updateNoteBody) {
        const { id, text } = updateNoteBody;
        await this.databaseUtilsService.updateNote({_id: id}, { text })
    }

}