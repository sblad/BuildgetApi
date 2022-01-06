import { BadRequestException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/persistence/entities/user.entity';
import { AuthCredentialsDto } from 'src/persistence/dtos/authCredentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne(userData);

    if (!user) {
      throw new NotFoundException('Cannot find user with that id');
    }

    return user;
  }

  async create(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.userRepository.findOne({
      email: authCredentialsDto.email,
    });

    if (user) {
      throw new BadRequestException('User already exists!');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, salt);

    const createdUser = new User();

    createdUser.email = authCredentialsDto.email;
    createdUser.password = hashedPassword;
    createdUser.salt = salt;

    createdUser.save();

    return createdUser;
  }
}
