import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';
import { User } from 'src/user/entity/user.entity';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Group, User]),
  ],
  exports: [GroupService],
})
export class GroupModule {}
