import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { compare, hash } from 'bcryptjs';
import { User } from '../user/schema/userSchema';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userTable: typeof User,
    private jwtService: JwtService,
  ) {}

  async signUpPost(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashedPassword = await hash(password as string, 12); // hash password
    const condidate = await this.userTable.findOne({
      where: { email },
      include: { all: true },
    }); // check user in DB
    if (condidate) {
      throw new HttpException(
        'User with this email address already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const user = await User.create({
      ...createUserDto,
      password: hashedPassword,
    }); // create new user
    return user;
  }
  async loginPost(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userTable.findOne({
      where: { email },
      include: { all: true },
    }); // check user in DB
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const isMatch: boolean = await compare(password, user?.password);
    if (!isMatch) {
      throw new HttpException(
        'Authentification failed. Check your email/password.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = this.generateToken(user);
    return token;
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
