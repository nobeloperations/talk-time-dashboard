import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { getUserFromCookies } from 'helpers/user_cookies';
import { BadgeModel } from 'models/badge.model';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { User } from 'models/user.model';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';
import { Badge, BadgeUser, GetProfileParams, UserPayload } from 'types/types';

@Injectable()
export class ProfileService {

    constructor(private readonly databaseUtilsService: DatabaseUtilsService) {}

    formatBadges(badgesObject) {
        if (badgesObject) {
            const { badges } = badgesObject;
            const formattedBadges = []
            Object.keys(badges).forEach(badge => {
                formattedBadges.push({[badge]: badges[badge].count})
            })

            return formattedBadges
        } else return []
    }

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
        const [ currentUser, allUsers, badges, feedbacksReceived, feedbacksSent, notes ] = await Promise.all(
            [
                await this.databaseUtilsService.findUser({name}, ''),
                await this.databaseUtilsService.findUsers({name}, ''),
                await this.databaseUtilsService.findBadgeUserByName({name}),
                await this.databaseUtilsService.findFeedbacks({receiver: name}, ''),
                await this.databaseUtilsService.findFeedbacks({sender: name}, ''),
                await this.databaseUtilsService.findNotes({sender: name}, '')
            ]
        )

        const badgesSent = currentUser?.badgesSent;
        const usersMeetings = await this.getUsersMeetings(allUsers)
        const formattedBadges = this.formatBadges(badges)
          
        formattedBadges.forEach(formattedBadge => {
            const numberOfBadges: any = Object.values(formattedBadge)[0];
            const badgeLevel = numberOfBadges < 3 ? 3 : numberOfBadges < 5 ? 5 : numberOfBadges < 10 ? 10 : 20;

            formattedBadge.badgesSentDiff = Math.max(badgeLevel - badgesSent, 0);
            formattedBadge.badgesReceivedDiff = Math.max(badgeLevel - numberOfBadges, 0);

            if (numberOfBadges < 3 || badgesSent < 3) {
                formattedBadge.level = 'Knowledge';
            } else if (numberOfBadges < 5 || badgesSent < 5) {
                formattedBadge.level = 'Apprentice';
            } else if(numberOfBadges < 10 || badgesSent < 10) {
                formattedBadge.level = 'Mastery';
            } else {
                formattedBadge.level = "Leadership"
            }
        });
        
        return { cssFileName: "profile", url, date, generalName, isAuth: true, notes, profileName: name, badges: formattedBadges, feedbacksReceived, feedbacksSent, profileEmail: email, profileAvatar: currentUser?.avatar, badgesSent: currentUser?.badgesSent, usersMeetings, meetingsCount: allUsers.length, title: `${name}'s profile`}
        
    }
}