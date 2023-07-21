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
import { Auth } from 'models/auth.model';
import { Feedback } from 'models/feedback.model';
import { Meeting } from 'models/meeting.model';
import { Note } from 'models/note.model';
import { Reset } from 'models/reset.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';
export declare class DatabaseUtilsService {
    private readonly userModel;
    private readonly authModel;
    private readonly feedbackModel;
    private readonly noteModel;
    private readonly resetModel;
    private readonly meetingModel;
    constructor(userModel: Model<User>, authModel: Model<Auth>, feedbackModel: Model<Feedback>, noteModel: Model<Note>, resetModel: Model<Reset>, meetingModel: Model<Meeting>);
    updateUserBadges(name: string, badge: string): Promise<void>;
    findFeedbacksByUrlAndDate(url: any, date: any): Promise<(import("mongoose").Document<unknown, any, Feedback> & Omit<Feedback & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findUsersByUrlAndDate(url: any, date: any): Promise<(import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findNotesByUrlAndDate(url: any, date: any): Promise<(import("mongoose").Document<unknown, any, Note> & Omit<Note & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    updateUserPercents(name: any, url: any, date: any, percent: any): Promise<void>;
    deleteNoteById(id: any): Promise<void>;
    findFeedbacksByReceiverAndUrlAndDate(name: any, url: any, date: any): Promise<(import("mongoose").Document<unknown, any, Feedback> & Omit<Feedback & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findUserByNameAndUrlAndDate(name: any, url: any, date: any): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findUserByName(name: any): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findUsersAndSelectFields(filter: any, fields: any): Promise<(import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findUserAvatarByName(name: any): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findMeetingsByNameIncluding(generalNames: any): Promise<(import("mongoose").Document<unknown, any, Meeting> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findMeetingByName(name: any): Promise<import("mongoose").Document<unknown, any, Meeting> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    UpdateMeetingByName(name: any, url: any, date: any): Promise<void>;
    findAuth(filters: any): Promise<import("mongoose").Document<unknown, any, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAuthPassword(email: string, password: string): Promise<any>;
    deleteResetById(id: any): Promise<void>;
    findResetById(id: any): Promise<import("mongoose").Document<unknown, any, Reset> & Omit<Reset & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createNewMeeting(name: any, url: any, date: any): Promise<void>;
    createNewFeedback(sender: any, receiver: any, feedback: any, rating: any, url: any, senderImg: any, feedbackImg: any, date: any): Promise<void>;
    createNewNote(url: any, date: any, text: any, tags: any): Promise<string>;
    createNewUser(name: any, avatar: any, url: any, date: any, generalName: any): Promise<void>;
    createNewAuth(name: any, email: any, password: any): Promise<import("mongoose").Document<unknown, any, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createNewReset(id: any): Promise<import("mongoose").Document<unknown, any, Reset> & Omit<Reset & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
