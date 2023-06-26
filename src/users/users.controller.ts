import { Controller, Post, HttpCode, Param, Body, Headers, Get, Render, Res, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get('/:name')
    @HttpCode(200)
    getUsersAvatar(@Param() params) {
        return this.usersService.getUsersAvatar(params)
    }

    @Post('/create/:url/:date')
    @HttpCode(200)
    newUser(@Param() params, @Body() newUserBody, @Headers() headers) {
        return this.usersService.newUser(params, newUserBody, headers)
    }

    
    @Get('/:url/:date')
    @HttpCode(200)
    @Render('users')
    getUsers(@Param() params, @Res() res: Response, @Query('q') generalName) {
        return this.usersService.getUsers(params, res, generalName)
    }
}
