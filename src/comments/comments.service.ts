import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from 'models/feedback.model';
import { User } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
    

    constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
    @InjectModel('User') private readonly userModel: Model<User>){}

    async getComments(params) {
        const { id, url, date } = params;
        let feedback = await this.feedbackModel.findOne({ _id: id, url })
        let users = await this.userModel.find({ url, date })

        return { cssFileName: 'comments', url, users, feedback }
    }

    async newComment(params, newCommentBodyDto, res) {
        const { id, url } = params;
        const { comment, commentName } = newCommentBodyDto;

        await this.feedbackModel.findOneAndUpdate({ _id: id, url }, { $push: { comments: { commentName, comment, date: new Date().toLocaleDateString() } } })
        res.redirect(`/comments/${url}/${id}`)
    }
}
