/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { BadgeModel } from 'models/badge.model';
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
    static userModel: Model<User>;
    constructor(userModel: Model<User>, feedbackModel: Model<Feedback>, noteModel: Model<Note>, meetingModel: Model<Meeting>, BadgeModel: Model<BadgeModel>);
    findBadgeUserByName(filter: {
        name: string;
    }): Promise<import("mongoose").Document<unknown, any, BadgeModel> & Omit<BadgeModel & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateUserBadgesSent(filter: {
        name: string;
    }): Promise<UpdateWriteOpResult>;
    updateBadge(badge: string, name: string): Promise<void>;
    findAllBadgesUsers(): Promise<(import("mongoose").Document<unknown, any, BadgeModel> & Omit<BadgeModel & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findBadgesUsersByNameIncluding(names: string[]): Promise<(import("mongoose").Document<unknown, any, BadgeModel> & Omit<BadgeModel & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getCountOfBadgesUsers(): Promise<number>;
    findBadgesUsersInRange(page: number, limit: number): Promise<any>;
    createBadgesUser(name: any): Promise<void>;
    updateUserBadges(name: string, badge: string): Promise<UpdateWriteOpResult>;
    updateUserPercents(filter: object, update: object): Promise<string | void>;
    findUsersByUrlIncluded(urls: string[]): Promise<any>;
    findUsers(filter: object, fields: string): Promise<any>;
    findUser(filter: object, fields: string): Promise<any>;
    updateUser(filter: object, update: any): Promise<UpdateWriteOpResult>;
    updateUsers(filter: object, update: any): Promise<UpdateWriteOpResult>;
    findFeedbacks(filter: object, fields: string): Promise<any>;
    findNotes(filter: object, fields: string): Promise<any>;
    deleteNote(filter: object): Promise<any>;
    updateNote(filter: Object, update: Object): Promise<any>;
    findMeetingsByNameIncluding(generalNames: string[]): Promise<any>;
    findMeetingsByNameAndDateIncluding(filter: {
        url: string;
        date: string;
    }): Promise<import("mongoose").Document<unknown, any, Meeting> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findMeeting(filter: Object, fields: string): Promise<any>;
    updateMeetingByName(name: string, url: string, date: string): Promise<any>;
    createNewMeeting(name: string, url: string, date: string): Promise<any>;
    createNewFeedback(sender: string, receiver: string, feedback: string, rating: number, url: string, senderImg: string, feedbackImg: string, date: string, generalName: string): Promise<any>;
    createNewNote(url: string, date: string, text: string, sender: string, generalName: string): Promise<Note>;
    createNewUser(name: string, avatar: string, url: string, date: string, generalName: string): Promise<any>;
}
