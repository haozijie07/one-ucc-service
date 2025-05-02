import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp(); // 切换到 HTTP 上下文,显式告诉 Nest：我现在要处理 HTTP 请求
    const res = ctx.getResponse(); // Express 响应对象

    res.statusCode = 200;

    // map() 是 RxJS 的一个操作符，它会接收 Controller 返回的数据 data，并把它包裹成一个统一格式的对象。
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: 'success',
        data,
      })),
    );
  }
}
