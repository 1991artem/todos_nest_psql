import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private _groupsRepository: Repository<Group>,
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
}
