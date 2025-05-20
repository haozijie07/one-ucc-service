import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const appModuleWithImports = await AppModule.registerDynamicModules();
  const app = await NestFactory.create(appModuleWithImports);

  const config = new DocumentBuilder()
    .setTitle('haozi-ucc-swagger')
    .setDescription('接口文档说明')
    .setVersion('1.0')
    .addBearerAuth() // 如果你有 JWT 鉴权
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
