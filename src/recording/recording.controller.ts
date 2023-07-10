import { Controller, Get, HttpCode, Param, Query, Render, Res } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { Response } from 'express';

@Controller('recording')
export class RecordingController {
    constructor(private recordingService: RecordingService){}

    @Get('/:url/:date')
    @Render('recording')
    @HttpCode(200)
    getRecording(@Param() params: Object, @Res() res: Response, @Query('q') generalName: string) {
        return this.recordingService.getRecording(params, res, generalName)
    }
}
