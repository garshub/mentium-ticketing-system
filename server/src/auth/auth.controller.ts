// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  ConflictException,
  HttpException,
  HttpStatus,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginParams: LoginParams) {
    const user = await this.authService.validateUser(loginParams);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  async signup(@Body() signupParams: SignupParams) {
    try {
      const user = await this.authService.register(signupParams);
      return { message: 'User registered successfully', user };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user')
  async getUserDetails(@Headers('authorization') token: string) {
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.BAD_REQUEST);
    }
    try {
      const getToken = token.split(' ')[1];
      const user = await this.authService.getUserFromToken(getToken);
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
