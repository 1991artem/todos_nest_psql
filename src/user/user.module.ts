import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { GroupModule } from '../group/group.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => GroupModule),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserService],
})
export class UserModule {}
