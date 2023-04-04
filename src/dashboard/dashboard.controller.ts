import { Controller, Get, Render, HttpCode, Param, Post, Body, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('')
export class DashboardController {

    constructor(private dashboardService: DashboardService){}

    @Get('dashboard/:url/:date')
    @Render('dashboard')
    @HttpCode(200)
    getDashboard(@Param() params) {
        return this.dashboardService.getDashboard(params)   
         
    }   
    
    @Post('/percentage/:url/:date')
    @HttpCode(200)
    postPercents(@Param() params, @Body() postPercentsBodyDto) {
        return this.dashboardService.postPercents(params, postPercentsBodyDto)
    }

    @Post('/newconclusion/:url/:date')
    @HttpCode(200)
    newConclusion(@Param() params, @Body() createConclusionBodyDto) {
        return this.dashboardService.newConclusion(params, createConclusionBodyDto)
    }

    @Delete('/deleteconclusion')
    @HttpCode(200)
    deleteConclusion(@Body() deleteConclusionBodyDto) {
        return this.dashboardService.deleteConclusion(deleteConclusionBodyDto)
    } 

    @Post('/importantconclusion')
    @HttpCode(200)
    importantConclusion(@Body() importantConclusionBodyDto) {
        return this.dashboardService.importantConclusion(importantConclusionBodyDto)
    }
}
