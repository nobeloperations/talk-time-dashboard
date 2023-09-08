import { Controller, Get, Render, HttpCode, Param, Post, Body, Delete, Res, Query, Req, Patch } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Request, Response } from 'express';
import { CreateNoteBody, CreateNoteParams, DeleteNoteBody, GetDashboardParams, UpdateNoteBody, UpdatePercentageBody, UpdatePercentageParams } from 'types/types';
import { Note } from 'models/note.model';

@Controller('')
export class DashboardController {

    constructor(private dashboardService: DashboardService) { }

    @Get('dashboard/:url/:date')
    @Render('dashboard')
    @HttpCode(200)
    getDashboard(@Param() params: GetDashboardParams, @Res() res: Response, @Query('q') generalName: string, @Req() req: Request) {
        return this.dashboardService.getDashboard(params, res, generalName, req)

    }

    @Post('/percentage/:url/:date')
    @HttpCode(200)
    postPercents(@Param() params: UpdatePercentageParams, @Body() updatePercentsBody: UpdatePercentageBody): Promise<void | string> {
        return this.dashboardService.updatePercents(params, updatePercentsBody)
    }

    @Post('/newconclusion/:url/:date')
    @HttpCode(200)
    newNote(@Param() params: CreateNoteParams, @Body() createNoteBody: CreateNoteBody): Promise<Note | string> {
        return this.dashboardService.newNote(params, createNoteBody)
    }

    @Delete('/deleteconclusion')
    @HttpCode(200)
    deleteNote(@Body() deleteNoteBody: DeleteNoteBody): Promise<void | string> {
        return this.dashboardService.deleteNote(deleteNoteBody)
    }

    @Patch('/updatenote')
    @HttpCode(200)
    updateNote(@Body() updateNoteBody: UpdateNoteBody): Promise<void> {
        return this.dashboardService.updateNote(updateNoteBody)
    }
}
