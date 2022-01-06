import { JwtPayload } from './jwt/jwt.types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from 'src/persistence/dtos/authCredentials.dto';
import { User } from 'src/persistence/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: AuthCredentialsDto) {
    const { email, password } = credentials;

    let user: User;
    try {
      user = await this.usersService.findOne({ email });
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatching = await user.validatePassword(password);

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: JwtPayload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async register(authCredentialsDto: AuthCredentialsDto) {
    return await this.usersService.create(authCredentialsDto);
  }
}
