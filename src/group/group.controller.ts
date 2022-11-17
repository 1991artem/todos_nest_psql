import { Controller, Post, Body, UseGuards, Query, Get } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { USER_ROLE } from 'src/helps/enums';
import { ShowParamsDto } from './dto/sort-group.dto';

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

  @Roles(USER_ROLE.USER)
  @UseGuards(RolesGuard)
  @Get('/all')
  @ApiResponse({ status: 200, type: User })
  async showAllGroups(@Query() showParamsDto: ShowParamsDto) {
    const groupArray = await this.groupService.showAllGroups(showParamsDto);
    return {
      amount: groupArray.length,
      groups: groupArray,
    };
  }
}
