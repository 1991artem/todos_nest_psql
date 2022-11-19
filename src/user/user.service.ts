import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
  ) {}

  async createUserPost(createUserDto: CreateUserDto) {
    const user = this._usersRepository.create(createUserDto).save();
    return user; // create new user
  }

  async findUserByEmail(email: string) {
    return this._usersRepository.findOneBy({
      email,
    });
  }

  async findUserById(id: number) {
    return this._usersRepository.findOneBy({
      id,
    });
  }

  async findAllUserInGroupByGroupId() {
    const users = await this._usersRepository.find({
      relations: {
        groups: true,
      },
    });
    return users;
  }
}
