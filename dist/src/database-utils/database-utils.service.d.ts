import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class DatabaseUtilsService {
    private readonly userModel;
    private readonly feedbackModel;
    private readonly noteModel;
    private readonly meetingModel;
    constructor(userModel: Model<User>, feedbackModel: Model<Feedback>, noteModel: Model<Note>, meetingModel: Model<Meeting>);
    updateUserBadges(name: string, badge: string): Promise<void>;
    updateUserPercents(name: string, url: string, date: string, percent: string): Promise<void>;
    findUsers(filter: object, fields: string): Promise<any>;
    findUser(filter: object, fields: string): Promise<any>;
    updateUser(filter: object, update: any): Promise<void>;
    updateUsers(filter: object, update: any): Promise<void>;
    findFeedbacks(filter: object, fields: string): Promise<any>;
    findNotes(filter: object, fields: string): Promise<any>;
    deleteNote(filter: object): Promise<void>;
    updateNote(filter: any, update: any): Promise<void>;
    findMeetingsByNameIncluding(generalNames: string[]): Promise<any>;
    findMeeting(filter: object, fields: string): Promise<any>;
    updateMeetingByName(name: string, url: string, date: string): Promise<void>;
    createNewMeeting(name: string, url: string, date: string): Promise<void>;
    createNewFeedback(sender: string, receiver: string, feedback: string, rating: number, url: string, senderImg: string, feedbackImg: string, date: string): Promise<void>;
    createNewNote(url: string, date: string, text: string, tags: string[], sender: string): Promise<string>;
    createNewUser(name: string, avatar: string, url: string, date: string, generalName: string): Promise<void>;
}
