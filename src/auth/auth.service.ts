import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { Auth } from 'models/auth.model';
import { Model } from 'mongoose';
import { Reset } from 'models/reset.model';
import { InjectModel } from '@nestjs/mongoose';
import { resolve } from 'path';
import * as nodemailer from 'nodemailer';



@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectModel('Reset') private readonly resetModel: Model<Reset>
    ) { }

    getSignin() {
        return { cssFileName: 'signin' }
    }

    getSignup() {
        return { cssFileName: 'signup' }
    }

    async login(user: Auth): Promise<any> {
        const currentUser = await this.userService.findByEmailAndName(user)
        if (!currentUser) return { message: "USER_NOT_FOUND" }
        const passwordsMatches = await bcrypt.compare(user.password, currentUser.password)
        if (!passwordsMatches) return { message: 'INVALID_PASS' }
        const payload = { name: currentUser.name, sub: currentUser._id, email: currentUser.email }
        return {
            access_token: this.jwtService.sign(payload),
        };

    }

    async signup(user: Auth): Promise<any> {
        const { name, email, password } = user;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUserByEmail = await this.userService.findByEmail(email);
        const existingUserByName = await this.userService.findByName(name);

        if (existingUserByEmail || existingUserByName) {
            return { message: 'ALREADY_EXIST', user: null };
        }

        const newUser = await this.userService.createUser(name, email, hashedPassword);
        return { message: 'SUCCESS_SIGNUP', user: newUser };
    }

    async getReset(params, res) {
        const { id } = params;
        const _idExist = await this.resetModel.findOne({ value: id })
        if (!_idExist) {
            return res.sendFile(resolve('views/notfound.html'))
        }
        return { cssFileName: 'reset' }
    }

    async createResetId(body) {
        const { id } = body;
        const newReset = new this.resetModel({
            value: id
        })
        newReset.save()
        console.log(newReset)
        return newReset
    }

    async resetPassword(params, body) {
        const { id } = params;
        const { email, password } = body;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const _idExist = await this.resetModel.findOne({ value: id })

        if (_idExist) {
            const currentUser = await this.userService.findByEmail(email)
            if (currentUser) {
                return this.userService.updatePassword(email, hashedPassword)
                .then(async () => {
                    await this.resetModel.deleteOne({value: id})
                })
            }
        }

        

        return { message: 'INVALID ID' }

    }

    async sendEmail(body) {

        const { email, id } = body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const options = {
            from: `Talk Time support <talktimeextension@gmail.com>`,
            to: email,
            subject: "Reset password in Talk Time",
            html: `
                <a href="https://nobeltt.com/auth/reset/${id}">Reset your password</a>
                `
        }

        transporter.sendMail(options, (err, info) => {
            if (err) console.log(err)
            else console.log(info)
        })
    }
}
