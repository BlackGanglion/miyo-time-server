import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'config/database';

const database: TypeOrmModuleOptions = {
  type: 'mysql',
  ...config,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // 注意：生产环境请关闭！
};

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    TaskModule
  ]
})
export class AppModule { }
