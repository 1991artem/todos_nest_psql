import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpPost(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.loginPost(createUserDto);
  }
}
