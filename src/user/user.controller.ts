import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  createUser(createUserDto: CreateUserDto) {
    return this.userService.createUserPost(createUserDto);
  }

  @ApiOperation({ summary: 'Get user  email' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findUserByEmail(email: string) {
    return this.userService.findUserByEmail(email);
  }
}
