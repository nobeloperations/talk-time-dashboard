import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor() { }

    googleLogin(req, res) {
        if (!req.user) {
          return 'No user from google'
        }
        const { email, picture, firstName, lastName } = req.user;
        return { email, picture, firstName, lastName, cssFileName: 'redirect' }
      }

    logOut(res) {
      res.clearCookie('user')
    }
}
