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

        const { url, date } = params;

        return {url, date, cssFileName: 'quiz', isAuth: true, profileName: userPayload.name, title: "Quiz" }
    }
}
    
