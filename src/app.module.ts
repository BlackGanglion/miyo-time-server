import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'config/database';
import { GoalsModule } from './goals/goals.module';
import { RecordsModule } from './records/records.module';

const database: TypeOrmModuleOptions = {
  type: 'mysql',
  ...config,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // 注意：生产环境请关闭！
};

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    GoalsModule,
    TasksModule,
    RecordsModule,
  ]
})
export class AppModule { }
