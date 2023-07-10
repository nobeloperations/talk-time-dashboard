import { Controller, Post, HttpCode, Param, Body, Headers, Get, Render, Res, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get('/:name')
    @HttpCode(200)
    getUsersAvatar(@Param() params: Object) {
        return this.usersService.getUsersAvatar(params)
    }

    @Post('/create/:url/:date')
    @HttpCode(200)
    newUser(@Param() params: Object, @Body() newUserBody: Object, @Headers() headers: Object) {
        return this.usersService.newUser(params, newUserBody, headers)
    }

    
    @Get('/:url/:date')
    @HttpCode(200)
    @Render('users')
    getUsers(@Param() params: Object, @Res() res: Response, @Query('q') generalName: String) {
        return this.usersService.getUsers(params, res, generalName)
    }
}
