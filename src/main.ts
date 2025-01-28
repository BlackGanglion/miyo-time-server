import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './middleware/response.interceptor';
import { HttpExceptionFilter } from './middleware/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用 CORS 并允许所有来源
  app.enableCors({
    origin: '*',
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
