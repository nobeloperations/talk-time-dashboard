import { Controller, Get, HttpCode, Param, Query, Render, Res } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { Response } from 'express';

@Controller('recording')
export class RecordingController {
    constructor(private recordingService: RecordingService){}

    @Get('/:url/:date')
    @Render('recording')
    @HttpCode(200)
    getRecording(@Param() params, @Res() res: Response, @Query('q') generalName) {
        return this.recordingService.getRecording(params, res, generalName)
    }
}
