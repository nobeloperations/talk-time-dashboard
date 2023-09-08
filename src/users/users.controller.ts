import { Controller, Post, HttpCode, Param, Body, Headers, Get, Render, Res, Query, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { Request, Response } from 'express';
import { GetUserAvatarParams, GetUsersParams, NewUserBody, NewUserParams } from 'types/types';

@Controller('users')
export class UsersController {

    constructor(private usersService: UserService){}

    @Get('/:name')
    @HttpCode(200)
    getUsersAvatar(@Param() params: GetUserAvatarParams) {
        return this.usersService.getUsersAvatar(params)
    }

    @Post('/create/:url/:date')
    @HttpCode(200)
    newUser(@Param() params: NewUserParams, @Body() newUserBody: NewUserBody, @Headers() headers: Object): Promise<void | string> {
        return this.usersService.newUser(params, newUserBody, headers)
    }

    
    @Get('/:url/:date')
    @HttpCode(200)
    @Render('users')
    getUsers(@Param() params: GetUsersParams, @Res() res: Response, @Query('q') generalName: string, @Req() req: Request) {
        return this.usersService.getUsers(params, res, generalName, req)
    }
}
