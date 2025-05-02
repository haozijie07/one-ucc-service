import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // 启用校验

  app.useGlobalInterceptors(new ResponseInterceptor()); // 响应拦截器

  app.useGlobalFilters(new AllExceptionsFilter()); // 异常过滤器

  app.enableCors({
    origin: true, // 或指定字符串、字符串数组，比如 'https://example.com'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 如果需要支持 cookie
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
