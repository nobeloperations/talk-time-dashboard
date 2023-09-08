import { Injectable } from '@nestjs/common';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Response, Request } from 'express';
import { CreateNoteBody, CreateNoteParams, DeleteNoteBody, GetDashboardParams, GetDashboardReturn, UpdateNoteBody, UpdatePercentageBody, UpdatePercentageParams } from 'types/types';
import { Note } from 'models/note.model';


@Injectable()
export class DashboardService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getDashboard(params: GetDashboardParams, res: Response, generalName: string, req: Request): Promise<GetDashboardReturn | void> {
        try {
            const userPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            const { url, date } = params;
            const [users, notes, feedbacks] = await Promise.all([
                await this.databaseUtilsService.findUsers({ url, date }, ''),
                await this.databaseUtilsService.findNotes({ url, date }, ''),
                await this.databaseUtilsService.findFeedbacks({ url, date }, '')
            ])

            if(!users.length) {
                return res.status(404).render('notfound')
            }

            return { cssFileName: 'dashboard', url, users, notes, usersLength: users.length, feedbacksLength: feedbacks.length, date, generalName, profileName: userPayload.name, isAuth: true, title: "Dashboard" }
        }
        catch (e) {
            throw new Error(`THIS IS ERROR ${e}`)
        }

    }

    async updatePercents(params: UpdatePercentageParams, postPercentsBody: UpdatePercentageBody): Promise<void | string> {
        try {
            const { percents } = postPercentsBody
            const { url, date } = params
            percents.forEach(async percentage => {
                const { name , percent } = percentage;
                if(name.trim() && percent.trim()) {
                    return await this.databaseUtilsService.updateUserPercents({name, url, date}, {percents: percent})
                }
            })
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async newNote(params: CreateNoteParams, createNoteBody: CreateNoteBody): Promise<Note | string> {
        try {
            let { url, date } = params;
            let { text, tags, sender } = createNoteBody
            const newNote = this.databaseUtilsService.createNewNote(url, date, text, tags, sender)
            return newNote
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

    async deleteNote(deleteNoteBody: DeleteNoteBody): Promise<void | string> {
        try {
            const { id } = deleteNoteBody;
            return await this.databaseUtilsService.deleteNote({ _id: id })
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async updateNote(updateNoteBody: UpdateNoteBody): Promise<void> {
        const { id, text } = updateNoteBody;
        return await this.databaseUtilsService.updateNote({_id: id}, { text })
    }

}