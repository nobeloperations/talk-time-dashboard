import { Injectable } from '@nestjs/common';
import { GoogleLoginReturn } from 'types/types';
import { Response } from 'express'

@Injectable()
export class AuthService {

    constructor() { }

    googleLogin(req: any): GoogleLoginReturn | string {
        if (!req.user) {
          return 'No user from google'
        }
        
        const { email, picture, firstName, lastName } = req.user;
        return { email, picture, firstName, lastName, cssFileName: 'redirect' }
      }

    logOut(res: Response) {
      res.clearCookie('user')
    }
}
