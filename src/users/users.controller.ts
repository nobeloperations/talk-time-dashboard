import { Controller, Post, HttpCode, Param, Body, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { UrlDto } from 'global.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/create/:url')
    @HttpCode(200)
    newUser(@Param() params: UrlDto, @Body() newUserBodyDto, @Headers() headers) {
        return this.usersService.newUser(params, newUserBodyDto, headers)
    }
}
