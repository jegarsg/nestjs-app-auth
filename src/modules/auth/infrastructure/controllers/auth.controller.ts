import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from '../../application/dtos/register-user.dto';
import { LoginUserDto } from '../../application/dtos/login-user.dto';
import { AuthService } from '../../application/services/auth.service';
import { User } from '../../domain/entities/user.entity';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  async register(@Body() dto: RegisterUserDto): Promise<User> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(dto);
  }
}