import { Body, Controller, Get, Headers, HttpCode, Param, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { TestmodService } from './testmod.service';

@Controller('testmod')
export class TestmodController {
    constructor(private usersService: TestmodService){}

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
