import { Controller, Get, Post, Body, Render, HttpCode, Param } from '@nestjs/common';
import { AudioService } from './audio.service';
import { VadDto } from './dtos/vad.dto';
import { UrlDto } from 'global.dto';

@Controller('audio')
export class AudioController {

    constructor(private audioService: AudioService){}

    @Get('/vad/:url/:name')
    @Render('vad')
    @HttpCode(200)
    getVad(@Param() params: VadDto) {
        return this.audioService.getVad(params)
    }

    @Post('/vad/:url/:name')
    @HttpCode(200)
    postPeaks(@Param() params, @Body() postPeaksBodyDto: VadDto) {
        return this.audioService.postPeaks(params, postPeaksBodyDto)
    }

    @Get('/activity/:url')
    @Render('activity')
    @HttpCode(200)
    getAudioActivity(@Param() params: UrlDto) {
        return this.audioService.getAudioActivity(params)
    }
}
