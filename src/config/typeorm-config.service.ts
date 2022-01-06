import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const x = this.configService.get('password');

    return {
      type: this.configService.get('type') as any,
      host: this.configService.get('host'),
      port: +this.configService.get('port'),
      username: this.configService.get('username'),
      password: this.configService.get('password') as any,
      database: this.configService.get('database') as any,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}
