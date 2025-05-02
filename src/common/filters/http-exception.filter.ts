import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 切换到 HTTP 上下文,显式告诉 Nest：我现在要处理 HTTP 请求
    const response = ctx.getResponse(); // Express 响应对象
    const request = ctx.getRequest(); // Express 请求对象

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器错误';
    let code = 500;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      code = status;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res: any = exceptionResponse;
        message = res.message || message;
      }
    }

    response.status(200).json({
      code,
      message,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
