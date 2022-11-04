import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpPost(createUserDto);
  }
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.loginPost(createUserDto);
  }
}
