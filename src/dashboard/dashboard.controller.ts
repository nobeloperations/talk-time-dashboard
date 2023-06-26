import { Controller, Get, Render, HttpCode, Param, Post, Body, Delete, Res, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Response } from 'express';

@Controller('')
export class DashboardController {

    constructor(private dashboardService: DashboardService){}

    @Get('dashboard/:url/:date')
    @Render('dashboard')
    @HttpCode(200)
    getDashboard(@Param() params, @Res() res: Response, @Query('q') generalName) {
        return this.dashboardService.getDashboard(params, res, generalName)   
         
    }   
    
    @Post('/percentage/:url/:date')
    @HttpCode(200)
    postPercents(@Param() params, @Body() updatePercentsBody) {
        return this.dashboardService.updatePercents(params, updatePercentsBody)
    }

    @Post('/newconclusion/:url/:date')
    @HttpCode(200)
    newConclusion(@Param() params, @Body() createNoteBody) {
        return this.dashboardService.newNote(params, createNoteBody)
    }

    @Delete('/deleteconclusion')
    @HttpCode(200)
    deleteConclusion(@Body() deleteConclusionBody) {
        return this.dashboardService.deleteConclusion(deleteConclusionBody)
    } 
}
