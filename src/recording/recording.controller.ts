import { Controller, Get, HttpCode, Param, Render, Res } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { Response } from 'express';

@Controller('recording')
export class RecordingController {
    constructor(private recordingService: RecordingService){}

    @Get('/:generalName/:url/:date')
    @Render('recording')
    @HttpCode(200)
    getRecording(@Param() params, @Res() res: Response) {
        return this.recordingService.getRecording(params, res)
    }
}
