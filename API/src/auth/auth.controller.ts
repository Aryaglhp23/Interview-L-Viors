/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; 
import { jwt_config } from 'src/config/jwt';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    const checkUserExists = await this.authService.login(data);
    return checkUserExists; 
  }

  generateJWT(payload: any) {
    return this.authService.generateJWT(payload); 
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    return await this.authService.profile(req.user.id);
  }
}