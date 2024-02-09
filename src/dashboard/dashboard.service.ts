import { Injectable } from '@nestjs/common';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Response, Request } from 'express';
import { CreateNoteBody, CreateNoteParams, DeleteNoteBody, GetDashboardParams, GetDashboardReturn, Percent, UpdateNoteBody, UpdatePercentageBody, UpdatePercentageParams, UserPayload } from 'types/types';
import { Note } from 'models/note.model';
import { User } from 'models/user.model';
import { Feedback } from 'models/feedback.model';


@Injectable()
export class DashboardService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) { }

    async getDashboard(params: GetDashboardParams, res: Response, generalName: string, req: Request): Promise<GetDashboardReturn | void> {
        try {
            const userPayload: UserPayload = getUserFromCookies(req)
            if(!userPayload) return res.redirect('/')
            const { url, date }: GetDashboardParams = params;
            const [users, notes, feedbacks]: [User[], Note[], Feedback[]] = await Promise.all([
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

    async updatePercents(params: UpdatePercentageParams, updatePercentageBody: UpdatePercentageBody): Promise<void | string> {
        try {
            const { percents }: UpdatePercentageBody = updatePercentageBody;
            const { url, date }: UpdatePercentageParams = params;
            console.log(percents)
            percents.forEach(async (percentage: Percent) => {
                const { name , percent }: Percent = percentage;
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
            let { url, date }: CreateNoteParams = params;
            let { text, sender, generalName }: CreateNoteBody = createNoteBody
            const newNote: Note = await this.databaseUtilsService.createNewNote(url, date, text, sender, generalName)
            
            return JSON.stringify(newNote)
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }

    }

    async deleteNote(deleteNoteBody: DeleteNoteBody): Promise<void | string> {
        try {
            const { id }: DeleteNoteBody = deleteNoteBody;
            return await this.databaseUtilsService.deleteNote({ _id: id })
        }
        catch (e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }

    async updateNote(updateNoteBody: UpdateNoteBody): Promise<void> {
        const { id, text }: UpdateNoteBody = updateNoteBody;
        return await this.databaseUtilsService.updateNote({_id: id}, { text })
    }

}