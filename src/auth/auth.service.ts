import { Injectable } from '@nestjs/common';
import { AuthUser, GoogleLogin, GoogleLoginReturn } from 'types/types';
import { Response, Request } from 'express'

@Injectable()
export class AuthService {

    constructor() { }

    googleLogin(req: any): GoogleLoginReturn | string {

      const currentUser: AuthUser = req.user;
        if (!currentUser) {
          return 'No user from google'
        }
        
        const { email, picture, firstName, lastName }: GoogleLogin = currentUser;
        return { email, picture, firstName, lastName, cssFileName: 'redirect' }
      }

    logOut(res: Response) {
      res.clearCookie('user')
    }
}
