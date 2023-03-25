import { Controller, Post, HttpCode, Param, Body, Headers, Get, Render } from '@nestjs/common';
import { UsersService } from './users.service';
import { UrlDto } from 'global.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/create/:url/:date')
    @HttpCode(200)
    newUser(@Param() params: CreateUserDto, @Body() newUserBodyDto, @Headers() headers) {
        return this.usersService.newUser(params, newUserBodyDto, headers)
    }

    
    @Get('/:url/:date')
    @HttpCode(200)
    @Render('users')
    getUsers(@Param() params: UrlDto) {
        return this.usersService.getUsers(params)
    }
}
