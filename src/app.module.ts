import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TaskModule } from './task/task.module';
import { Group, UserGroup } from './group/schema/groupSchema';
import { Task } from './task/schema/taskSchema';
import { User } from './user/schema/userSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Group, UserGroup, Task],
      autoLoadModels: true,
    }),
    AuthModule,
    UserModule,
    GroupModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
