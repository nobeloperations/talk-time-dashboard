import { Controller, Post, HttpCode, Param, Body, Headers, Get, Render, Res } from '@nestjs/common';
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
    newUser(@Param() params, @Body() newUserBodyDto, @Headers() headers) {
        return this.usersService.newUser(params, newUserBodyDto, headers)
    }

    
    @Get('/:generalName/:url/:date')
    @HttpCode(200)
    @Render('users')
    getUsers(@Param() params, @Res() res: Response) {
        return this.usersService.getUsers(params, res)
    }

    @Post('/updatestatus')
    @HttpCode(200)
    updateStatus(@Body() updateStatusBodyDto) {
        return this.usersService.updateStatus(updateStatusBodyDto)
    }

    @Get('/getstatuses/:url/:date')
    @HttpCode(200)
    getStatuses(@Param() params) {
        return this.usersService.getStatuses(params)
    }
}
