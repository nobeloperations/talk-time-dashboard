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

    async updateQuizResults(params) {
        const { name, index } = params;

        await this.databaseUtilsService.updateQuizResultsByIndex(+index, name);
    }

    async getQuizesResults(params) {
        const { name } = params;

        const badgeUser = await this.databaseUtilsService.findBadgeUserByName({ name });

        return badgeUser ? badgeUser.quizResults : null;
    }

    async getFinishQuiz(params) {
        const { result, url, date } = params;

        const title = result === "passed" ? "Congratulations!" : "Ooops...";
        const text = result === "passed" ? "You have successfully mastered the quiz!" : "Unfortunately, you have not mastered the quiz!";

        return { title, text, url, date }


    }
}
    
