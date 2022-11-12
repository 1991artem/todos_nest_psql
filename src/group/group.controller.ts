import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { USER_ROLE } from 'src/helps/enums';

@Controller('api/v1/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(USER_ROLE.USER)
  @UseGuards(RolesGuard)
  @Post('/create')
  @ApiResponse({ status: 201, type: User })
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    const group = await this.groupService.createGroup(createGroupDto);
    return {
      id: group.id,
      message: 'Group has been created',
      body: group,
    };
  }
}
