import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { resolve } from 'path';
import { Meeting } from 'models/meeting.model';

@Injectable()
export class CommentsService {


    constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>) { }

    async getComments(params, res) {
        try {
            const { id, url, date } = params;
            let feedback = await this.feedbackModel.findOne({ _id: id, url })
            let users = await this.userModel.find({ url, date })
            let meeting = await this.meetingModel.findOne({url, date})
            let currentMeeting = false;
            meeting.meetings.forEach(curr => {
                if(curr['date'] == date) currentMeeting = true;
            })

            if (!feedback || !meeting || !currentMeeting) {
                res.redirect(resolve('views/notfound.html'))
                return;
            }

            return { cssFileName: 'comments', url, users, feedback, date }
        }
        catch(e) {
            res.sendFile(resolve('views/notfound.html'))
        }
    }

    async newComment(params, newCommentBodyDto, res) {
        try {
            const { id, url } = params;
            const { comment, commentName } = newCommentBodyDto;

            await this.feedbackModel.findOneAndUpdate({ _id: id, url }, { $push: { comments: { commentName, comment, date: new Date().toLocaleDateString() } } })
            res.redirect(`/comments/${url}/${id}`)
        }
        catch(e) {
            return JSON.stringify({ message: 'Something went wrong...', error: e })
        }
    }
}
