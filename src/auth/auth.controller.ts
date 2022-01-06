import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/persistence/dtos/authCredentials.dto';
import { User } from 'src/persistence/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }
}
