import { Controller, Post, HttpCode, Param, Body, Headers, Get, Render } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/create/:url/:date')
    @HttpCode(200)
    newUser(@Param() params, @Body() newUserBodyDto, @Headers() headers) {
        return this.usersService.newUser(params, newUserBodyDto, headers)
    }

    
    @Get('/:url/:date')
    @HttpCode(200)
    @Render('users')
    getUsers(@Param() params) {
        return this.usersService.getUsers(params)
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
