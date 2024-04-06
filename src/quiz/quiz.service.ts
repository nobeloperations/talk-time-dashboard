import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { getUserFromCookies } from 'helpers/user_cookies';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { UserPayload } from 'types/types';

@Injectable()
export class QuizService {
    constructor(private readonly databaseUtilsService: DatabaseUtilsService) {}

    async getQuiz(params, req: Request, res: Response) {
        const userPayload: UserPayload = getUserFromCookies(req)
        if (!userPayload) return res.redirect('/')

        const { quiz } = await this.databaseUtilsService.findUser({ name: userPayload.name }, 'quiz')

        const { url, date } = params;

        return {url, date, cssFileName: 'quiz', isAuth: true, profileName: userPayload.name, title: "Quiz", isPassed: quiz }
    }

    async getQuizResultsPage(params, result: string, generalName: string, username: string) {

        if (result === "true") await this.databaseUtilsService.updateUsers({ name: username }, { quiz: true })

        const { url, date } = params;

        const title: string = result === "true" ? 'Success!' : 'Ooops!';
        const text: string = result === "true" ? 'You have mastered knowlege test!' : 'Unfortunately, you have not completed knowlege test!';

        return { url, date, text, title, generalName };
    }

    async getQuizResultsByName(params) {
        const { name } = params;

        const user = await this.databaseUtilsService.findUser({ name }, '');

        return user ? JSON.stringify({ quiz: user.quiz }) : null
    }
}
    
