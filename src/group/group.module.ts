import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Group])],
  exports: [GroupService],
})
export class GroupModule {}
