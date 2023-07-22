import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'
import { Auth } from 'models/auth.model';
import { resolve } from 'path';
import * as nodemailer from 'nodemailer';
import { DatabaseUtilsService } from 'src/database-utils/database-utils.service';



@Injectable()
export class AuthService {

    constructor(
        private readonly databaseUtilsService: DatabaseUtilsService,
        private readonly jwtService: JwtService
    ) { }

    getSignin() {
        return { cssFileName: 'signin' }
    }

    getSignup() {
        return { cssFileName: 'signup' }
    }

    async login(user: Auth): Promise<any> {
        const { name, email } = user
        const currentUser = await this.databaseUtilsService.findAuth({name, email}, '')
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

        const existingUserByEmail = await this.databaseUtilsService.findAuth({email}, '');
        const existingUserByName = await this.databaseUtilsService.findAuth({name}, '');

        if (existingUserByEmail || existingUserByName) {
            return { message: 'ALREADY_EXIST', user: null };
        }

        const newUser = await this.databaseUtilsService.createNewAuth(name, email, hashedPassword);
        return { message: 'SUCCESS_SIGNUP', user: newUser };
    }

    async getReset(params, res) {
        const { id } = params;
        const _idExist = await this.databaseUtilsService.findReset({value: id}, '')
        if (!_idExist) {
            return res.sendFile(resolve('views/notfound.html'))
        }
        return { cssFileName: 'reset' }
    }

    async createResetId(body) {
        const { id } = body;
        const newReset = this.databaseUtilsService.createNewReset(id)
        return newReset
    }

    async resetPassword(params, body) {
        const { id } = params;
        const { email, password } = body;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const _idExist = await this.databaseUtilsService.findReset({value: id}, '')

        if (_idExist) {
            const currentUser = await this.databaseUtilsService.findAuth({email}, '')
            if (currentUser) {
                return this.databaseUtilsService.updateAuthPassword(email, hashedPassword)
                .then(async () => {
                    await this.databaseUtilsService.deleteResetById(id)
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
