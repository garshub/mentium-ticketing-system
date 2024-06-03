// auth.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginParams: LoginParams): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(loginParams.email);
      if (user && (await bcrypt.compare(loginParams.password, user.password))) {
        return user;
      }
      throw new UnauthorizedException('Unauthorized User');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.name,
      userId: user.id,
    };
  }

  async register(signupParams: SignupParams) {
    const existingUser = await this.usersService.findOneByEmail(
      signupParams.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(signupParams.password, 10);
    return this.usersService.create(
      new CreateUserDto(signupParams.email, hashedPassword, signupParams.name),
    );
  }

  async getUserFromToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOne(decoded.sub);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
