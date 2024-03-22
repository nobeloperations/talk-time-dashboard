import { Controller, Post, HttpCode, Param, Body, Headers, Get, Render, Res, Query, Req, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { Request, Response } from 'express';
import { GetUserAvatarParams, GetUsersParams, NewUserBody, NewUserParams } from 'types/types';

@Controller('')
export class UsersController {

    constructor(private usersService: UserService){}

    @Get('/users/:name')
    @HttpCode(200)
    getUsersAvatar(@Param() params: GetUserAvatarParams) {
        return this.usersService.getUsersAvatar(params)
    }

    @Post('/users/create/:url/:date')
    @HttpCode(200)
    newUser(@Param() params: NewUserParams, @Body() newUserBody: NewUserBody, @Headers() headers: Object): Promise<void | string> {
        return this.usersService.newUser(params, newUserBody, headers)
    }

    
    @Get('/users/:url/:date')
    @HttpCode(200)
    @Render('users')
    getUsers(@Param() params: GetUsersParams, @Res() res: Response, @Query('q') generalName: string, @Req() req: Request) {
        return this.usersService.getUsers(params, res, generalName, req)
    }

    @Get('/load/range')
    @HttpCode(200)
    getUsersInRange(@Query('page') page: number, @Query('limit') limit: number, @Res() res: Response) {
        return this.usersService.getUsersInRange(page, limit, res)
    }

    @Get('/users/meetingstats/:url/:date')
    @Render('meeting-stats')
    @HttpCode(200)
    getMeetingUsersStats(@Query('q') generalName: string, @Res() res: Response, @Req() req: Request) {
        return this.usersService.getMeetingUsersStats(generalName, res, req)
    }

    @Get('/friend-requests/:name')
    @HttpCode(200)
    getUserFriendRequests(@Param() name: string, @Res() res: Response) {
        return this.usersService.getUserFriendRequests(name, res)
    }

    @Post('/friends/new-friend/:name/:sender')
    @HttpCode(200)
    newFriendRequest(@Param() params) {
        return this.usersService.newFriendRequest(params)
    }

    @Get('/friends/friend-requests/:name')
    @HttpCode(200)
    getFriendRequests(@Param() params) {
        return this.usersService.getFriendRequests(params)
    }
    
    @Get('/friends/all-friends/:name')
    @HttpCode(200)
    getAllFriends(@Param() params) {
        return this.usersService.getAllFriends(params)
    }

    @Post('/friends/add-friend/:sender/:receiver')
    @HttpCode(200)
    addFriend(@Param() params) {
        return this.usersService.addFriend(params)
    }

    @Delete('/friends/delete/:receiver/:sender')
    @HttpCode(200)
    deleteFriend(@Param() params) {
        return this.usersService.deleteFriend(params)
    }

}
