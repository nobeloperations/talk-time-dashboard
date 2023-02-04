import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      host.switchToHttp().getResponse()
      .status(exception.getStatus())
      .json({
        statusCode: exception.getStatus(),
        message: 'Invalid Page URL'
      });
  }
}