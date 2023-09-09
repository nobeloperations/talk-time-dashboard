import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { User } from 'models/user.model';
import { Model, UpdateWriteOpResult } from 'mongoose';
export declare class DatabaseUtilsService {
    private readonly userModel;
    private readonly feedbackModel;
    private readonly noteModel;
    private readonly meetingModel;
    private readonly BadgeModel;
    constructor(userModel: Model<User>, feedbackModel: Model<Feedback>, noteModel: Model<Note>, meetingModel: Model<Meeting>, BadgeModel: Model<any>);
    findBadgeUserByName(filter: {
        name: string;
    }): Promise<any>;
    updateBadge(badge: string, name: string): Promise<void>;
    findAllBadgeUser(): Promise<any[]>;
    createBadgesUser(name: any): Promise<void>;
    updateUserBadges(name: string, badge: string): Promise<UpdateWriteOpResult>;
    updateUserPercents(filter: object, update: object): Promise<string | void>;
    findUsers(filter: object, fields: string): Promise<any>;
    findUser(filter: object, fields: string): Promise<any>;
    updateUser(filter: object, update: any): Promise<UpdateWriteOpResult>;
    updateUsers(filter: object, update: any): Promise<UpdateWriteOpResult>;
    findFeedbacks(filter: object, fields: string): Promise<any>;
    findNotes(filter: object, fields: string): Promise<any>;
    deleteNote(filter: object): Promise<any>;
    updateNote(filter: Object, update: Object): Promise<any>;
    findMeetingsByNameIncluding(generalNames: string[]): Promise<any>;
    findMeeting(filter: Object, fields: string): Promise<any>;
    updateMeetingByName(name: string, url: string, date: string): Promise<any>;
    createNewMeeting(name: string, url: string, date: string): Promise<any>;
    createNewFeedback(sender: string, receiver: string, feedback: string, rating: number, url: string, senderImg: string, feedbackImg: string, date: string): Promise<any>;
    createNewNote(url: string, date: string, text: string, tags: string[], sender: string): Promise<string>;
    createNewUser(name: string, avatar: string, url: string, date: string, generalName: string): Promise<any>;
}
