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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const path_1 = require("path");
const nodemailer = require("nodemailer");
const database_utils_service_1 = require("../database-utils/database-utils.service");
let AuthService = class AuthService {
    constructor(databaseUtilsService, jwtService) {
        this.databaseUtilsService = databaseUtilsService;
        this.jwtService = jwtService;
    }
    getSignin() {
        return { cssFileName: 'signin' };
    }
    getSignup() {
        return { cssFileName: 'signup' };
    }
    async login(user) {
        const { name, email } = user;
        const currentUser = await this.databaseUtilsService.findAuth({ name, email }, '');
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
        const existingUserByEmail = await this.databaseUtilsService.findAuth({ email }, '');
        const existingUserByName = await this.databaseUtilsService.findAuth({ name }, '');
        if (existingUserByEmail || existingUserByName) {
            return { message: 'ALREADY_EXIST', user: null };
        }
        const newUser = await this.databaseUtilsService.createNewAuth(name, email, hashedPassword);
        return { message: 'SUCCESS_SIGNUP', user: newUser };
    }
    async getReset(params, res) {
        const { id } = params;
        const _idExist = await this.databaseUtilsService.findReset({ value: id }, '');
        if (!_idExist) {
            return res.sendFile((0, path_1.resolve)('views/notfound.html'));
        }
        return { cssFileName: 'reset' };
    }
    async createResetId(body) {
        const { id } = body;
        const newReset = this.databaseUtilsService.createNewReset(id);
        return newReset;
    }
    async resetPassword(params, body) {
        const { id } = params;
        const { email, password } = body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const _idExist = await this.databaseUtilsService.findReset({ value: id }, '');
        if (_idExist) {
            const currentUser = await this.databaseUtilsService.findAuth({ email }, '');
            if (currentUser) {
                return this.databaseUtilsService.updateAuthPassword(email, hashedPassword)
                    .then(async () => {
                    await this.databaseUtilsService.deleteResetById(id);
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
    __metadata("design:paramtypes", [database_utils_service_1.DatabaseUtilsService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map