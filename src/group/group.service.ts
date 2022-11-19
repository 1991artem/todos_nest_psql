import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserToGroupDto } from './dto/group-user.dto';
import { ShowParamsDto } from './dto/sort-group.dto';
import { Group } from './entity/group.entity';
import { IGroup } from './group.interfaces';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private _groupsRepository: Repository<Group>,
    private userService: UserService,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const { name } = createGroupDto;
    const group = await this.findGroupByName(name);
    if (group) {
      throw new HttpException(
        'Group with this name address already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.create(createGroupDto);
  }
  async findGroupByName(name: string) {
    const group = await this._groupsRepository.findOneBy({
      name,
    });
    return group;
  }

  async create(createGroupDto: CreateGroupDto) {
    const group = await this._groupsRepository.create(createGroupDto).save();
    return group;
  }

  async showAllGroups(showParamsDto: ShowParamsDto) {
    //const { pagination, sort } = showParamsDto;
    const groupArray = await this.makeShowGroupArray();
    //const groupArray: IGroup[] = await this._groupsRepository.find();
    return groupArray;
  }

  async makeShowGroupArray() {
    const groupArray: IGroup[] = await this._groupsRepository.find({
      relations: {
        users: true,
      },
    });
    return groupArray.map((group: IGroup) => {
      return {
        id: group.id,
        name: group.name,
        description: group.description,
        createdAt: group.createdAt,
        usersAmount: group.users.length,
      };
    });
  }

  async addUserToGroup(addUserToGroupDto: UserToGroupDto) {
    const { userId, groupId } = addUserToGroupDto;
    const user: User = await this.userService.findUserById(userId);
    const group: Group = await this.findGroupById(groupId);

    if (!user || !group) {
      throw new HttpException('Group or User not found', HttpStatus.NOT_FOUND);
    }

    await Group.createQueryBuilder()
      .relation(Group, 'users')
      .of(group)
      .add(user);

    return {
      user,
      group,
    };
  }

  async removeUserFromGroup(removeUserFromGroupDTO: UserToGroupDto) {
    const { userId, groupId } = removeUserFromGroupDTO;
    const user: User = await this.userService.findUserById(userId);
    const group: Group = await this.findGroupById(groupId);

    if (!user || !group) {
      throw new HttpException('Group or User not found', HttpStatus.NOT_FOUND);
    }

    await Group.createQueryBuilder()
      .relation(Group, 'users')
      .of(group)
      .remove(user);

    return {
      user,
      group,
    };
  }

  async findGroupById(id: number) {
    return this._groupsRepository.findOneBy({
      id,
    });
  }
}
