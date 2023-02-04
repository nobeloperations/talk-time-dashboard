import { Controller, Get, Render, HttpCode, Param, Post, Body, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { postPercentsDto } from './dtos/post-percents.dto';
import { CreateConclusionDto } from './dtos/create-conclusion.dto';
import { IdDto, UrlDto } from '../../global.dto';

@Controller('')
export class DashboardController {

    constructor(private dashboardService: DashboardService){}

    @Get('dashboard/:url')
    @Render('dashboard')
    @HttpCode(200)
    getDashboard(@Param() params: UrlDto) {
        return this.dashboardService.getDashboard(params)   
         
    }   
    
    @Post('/percentage/:url')
    @HttpCode(200)
    postPercents(@Param() params: UrlDto, @Body() postPercentsBodyDto: postPercentsDto) {
        return this.dashboardService.postPercents(params, postPercentsBodyDto)
    }

    @Post('/newconclusion/:url')
    @HttpCode(200)
    newConclusion(@Param() params: UrlDto, @Body() createConclusionBodyDto: CreateConclusionDto) {
        return this.dashboardService.newConclusion(params, createConclusionBodyDto)
    }

    @Delete('/deleteconclusion')
    @HttpCode(200)
    deleteConclusion(@Body() deleteConclusionBodyDto: IdDto) {
        return this.dashboardService.deleteConclusion(deleteConclusionBodyDto)
    } 

    @Post('/importantconclusion')
    @HttpCode(200)
    importantConclusion(@Body() importantConclusionBodyDto: IdDto) {
        return this.dashboardService.importantConclusion(importantConclusionBodyDto)
    }
}
