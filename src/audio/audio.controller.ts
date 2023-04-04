import { Controller, Get, Post, Body, Render, HttpCode, Param } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {

    constructor(private audioService: AudioService){}

    @Get('/vad/:url/:name/:date')
    @Render('vad')
    @HttpCode(200)
    getVad(@Param() params) {
        return this.audioService.getVad(params)
    }

    @Post('/vad/:url/:name/:date')
    @HttpCode(200)
    postPeaks(@Param() params, @Body() postPeaksBodyDto) {
        return this.audioService.postPeaks(params, postPeaksBodyDto)
    }
}
