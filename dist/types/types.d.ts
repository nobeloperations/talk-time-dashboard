import { Feedback } from "models/feedback.model";
import { Meeting } from "models/meeting.model";
import { Note } from "models/note.model";
import { User } from "models/user.model";
export interface FilteredUser {
    name: string;
    avatar: string;
    badges: Badge[];
}
export interface notAuthenticated {
    cssFileName: string;
    isAuth: boolean;
}
interface GoogleNames {
    familyName: string;
    givenName: string;
}
interface GoogleEmails {
    value: string;
    verified: boolean;
}
interface GooglePhotos {
    value: string;
}
export interface GoogleProfile {
    name: GoogleNames;
    emails: GoogleEmails[];
    photos: GooglePhotos[];
}
export interface GoogleLogin {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
}
export interface AuthUser extends GoogleLogin {
    accessToken: string;
}
export interface UserPayload {
    name: string;
    email: string;
}
export interface Badge {
    badge: string;
}
export interface BadgeUser {
    _id: string;
    name: string;
    avatar: string;
    badges: Badge[];
    count: number;
    _doc: {};
}
export interface BadgeValues {
    count: number;
}
export interface Badges {
    Fun: BadgeValues;
    Encourage: BadgeValues;
    ZenEnviroment: BadgeValues;
    OnTime: BadgeValues;
    Help: BadgeValues;
    BePresent: BadgeValues;
    BeeBrief: BadgeValues;
}
export interface CreateNoteBody {
    sender: string;
    tags: string[];
    text: string;
}
export interface Percent {
    name: string;
    percent: string;
}
export interface UpdatePercentageBody {
    percents: Percent[];
}
export interface DeleteNoteBody {
    id: string;
}
export interface UpdateNoteBody {
    id: string;
    text: string;
}
export interface NewBadgeBody {
    badge: string;
    from: string;
}
interface UrlAndDateParams {
    date: string;
    url: string;
}
interface UrlAndDateAndNameParams {
    date: string;
    url: string;
    name: string;
}
export interface NewBadgeParams extends UrlAndDateAndNameParams {
}
export interface GetDashboardParams extends UrlAndDateParams {
}
export interface UpdatePercentageParams extends UrlAndDateParams {
}
export interface CreateNoteParams extends UrlAndDateParams {
}
export interface GetPersonalFeedbacksParams extends UrlAndDateAndNameParams {
}
export interface UsersMeeting extends UrlAndDateParams {
}
export interface FilteredMeeting extends UrlAndDateParams {
}
export interface GetProfileParams extends UrlAndDateParams {
}
export interface GetNewFeedbackParams extends UrlAndDateParams {
    receiver: string;
}
export interface FeedbackImage {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
export interface CreateNewFeedbackParams extends UrlAndDateParams {
    receiver: string;
    generalName: string;
}
export interface CreateFeedbackBody {
    rating: number;
    feedback: string;
    badge: string;
}
export interface AddGeneralBody extends UrlAndDateAndNameParams {
}
export interface GetUserAvatarParams {
    name: string;
}
export interface NewUserParams extends UrlAndDateParams {
}
export interface NewUserBody {
    avatar: string;
    generalName: string;
    name: string;
    date: string;
}
export interface GetUsersParams extends UrlAndDateParams {
}
export interface GoogleLoginReturn extends GoogleLogin {
    cssFileName: string;
}
interface GetPageReturn {
    cssFileName: string;
    url: string;
    date: string;
    generalName: string;
    title: string;
    isAuth: boolean;
    profileName: string;
}
export interface GetDashboardReturn extends GetPageReturn {
    users: User[];
    notes: Note[];
    usersLength: number;
    feedbacksLength: number;
}
export interface GetPersonalFeedbacksReturn extends GetPageReturn {
    name: string;
    currentUser: User;
    feedbacks: Feedback[];
}
export interface GetNewFeedbackReturn extends GetPageReturn {
    receiver: string;
    currentUser: User;
}
export interface MainReturn extends GetPageReturn {
    generals: Meeting[];
}
export interface GetUsersReturn extends GetPageReturn {
    users: any;
}
export {};
