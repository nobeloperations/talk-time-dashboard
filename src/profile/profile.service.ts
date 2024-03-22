import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { getUserFromCookies } from 'helpers/user_cookies';
import { Meeting } from 'models/meeting.model';
import { User } from 'models/user.model';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import {GetProfileParams, UserPayload } from 'types/types';

@Injectable()
export class ProfileService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) {}

    async getUsersMeetings(allUsers: User[]) {
        const usersMeetings = [];
    
        await Promise.all(allUsers.map(async ( user: User ) => {
            const { url, date } = user;
            const meeting: Meeting = await this.databaseUtilsService.findMeetingsByNameAndDateIncluding({ url, date });
    
            if(meeting?.meetings.length) {
                meeting.meetings.forEach(meet => {
                    if (meet.url === url && meet.date === date) {
                        usersMeetings.push({generalName: meeting.name, ...meet});
                    }
                });
            }
        }));
    
        return usersMeetings;
    }

    async getProfile(req: Request, res: Response, params: GetProfileParams, generalName: string) {
        const userPayload: UserPayload = getUserFromCookies(req)
        if (!userPayload) return res.redirect('/')
        const { name, email }: UserPayload = userPayload;
        const { url, date } = params;
        const [ currentUser, allUsers, feedbacksReceived, feedbacksSent, notes ] = await Promise.all(
            [
                await this.databaseUtilsService.findUser({name}, ''),
                await this.databaseUtilsService.findUsers({name}, ''),
                await this.databaseUtilsService.findFeedbacks({receiver: name}, ''),
                await this.databaseUtilsService.findFeedbacks({sender: name}, ''),
                await this.databaseUtilsService.findNotes({sender: name}, '')
            ]
        )

        const usersMeetings = await this.getUsersMeetings(allUsers)
        
        
        return { cssFileName: "profile", url, date, generalName, isAuth: true, notes, profileName: name, feedbacksReceived, feedbacksSent, profileEmail: email, profileAvatar: currentUser?.avatar, badgesSent: currentUser?.badgesSent, usersMeetings, meetingsCount: allUsers.length, title: `${name}'s profile`}
        
    }
}