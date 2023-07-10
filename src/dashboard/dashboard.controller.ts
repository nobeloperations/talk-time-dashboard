import { Controller, Get, Render, HttpCode, Param, Post, Body, Delete, Res, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Response } from 'express';

@Controller('')
export class DashboardController {

    constructor(private dashboardService: DashboardService){}

    @Get('dashboard/:url/:date')
    @Render('dashboard')
    @HttpCode(200)
    getDashboard(@Param() params: Object, @Res() res: Response, @Query('q') generalName: string) {
        return this.dashboardService.getDashboard(params, res, generalName)   
         
    }   
    
    @Post('/percentage/:url/:date')
    @HttpCode(200)
    postPercents(@Param() params: Object, @Body() updatePercentsBody: Object) {
        return this.dashboardService.updatePercents(params, updatePercentsBody)
    }

    @Post('/newconclusion/:url/:date')
    @HttpCode(200)
    newConclusion(@Param() params: Object, @Body() createNoteBody: Object) {
        return this.dashboardService.newNote(params, createNoteBody)
    }

    @Delete('/deleteconclusion')
    @HttpCode(200)
    deleteNote(@Body() deleteNoteBody: Object) {
        return this.dashboardService.deleteNote(deleteNoteBody)
    } 
}
