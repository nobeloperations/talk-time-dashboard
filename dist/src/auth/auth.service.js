"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const path_1 = require("path");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    constructor(userService, jwtService, resetModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.resetModel = resetModel;
    }
    getSignin() {
        return { cssFileName: 'signin' };
    }
    getSignup() {
        return { cssFileName: 'signup' };
    }
    async login(user) {
        const currentUser = await this.userService.findByEmailAndName(user);
        if (!currentUser)
            return { message: "USER_NOT_FOUND" };
        const passwordsMatches = await bcrypt.compare(user.password, currentUser.password);
        if (!passwordsMatches)
            return { message: 'INVALID_PASS' };
        const payload = { name: currentUser.name, sub: currentUser._id, email: currentUser.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signup(user) {
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
        const _idExist = await this.resetModel.findOne({ value: id });
        if (!_idExist) {
            return res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
        return { cssFileName: 'reset' };
    }
    async createResetId(body) {
        const { id } = body;
        const newReset = new this.resetModel({
            value: id
        });
        newReset.save();
        console.log(newReset);
        return newReset;
    }
    async resetPassword(params, body) {
        const { id } = params;
        const { email, password } = body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const _idExist = await this.resetModel.findOne({ value: id });
        if (_idExist) {
            const currentUser = await this.userService.findByEmail(email);
            if (currentUser) {
                return this.userService.updatePassword(email, hashedPassword)
                    .then(async () => {
                    await this.resetModel.deleteOne({ value: id });
                });
            }
        }
        return { message: 'INVALID ID' };
    }
    async sendEmail(body) {
        const { email, id } = body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const options = {
            from: `Talk Time support <talktimeextension@gmail.com>`,
            to: email,
            subject: "Reset password in Talk Time",
            html: `
                <a href="https://nobeltt.com/auth/reset/${id}">Reset your password</a>
                `
        };
        transporter.sendMail(options, (err, info) => {
            if (err)
                console.log(err);
            else
                console.log(info);
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)('Reset')),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map