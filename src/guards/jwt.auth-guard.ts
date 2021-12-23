import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log(err);
    console.log(user);
    console.log(info);

    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('token_expired');
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
