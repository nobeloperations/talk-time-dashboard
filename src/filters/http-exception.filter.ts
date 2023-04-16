import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import {resolve} from 'path'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.sendFile(resolve('views/notfound.html'));
  }
}